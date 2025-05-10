import { createContext, useContext, useReducer } from "react";
import { useCookies } from "react-cookie";

const PersonContext = createContext();

const initialState = {
  persons: [],
  isLoading: false,
  error: null,
  editingPerson: null,
};

const personReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PERSONS_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "FETCH_PERSONS_SUCCESS":
      return { ...state, isLoading: false, persons: action.payload };
    case "FETCH_PERSONS_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "SET_EDITING_PERSON":
      return { ...state, editingPerson: action.payload };
    case "RESET_EDITING_PERSON":
      return { ...state, editingPerson: null };
    case "ADD_PERSON_TO_LIST":
      return {
        ...state,
        persons: [...state.persons, action.payload],
      };
    case "UPDATE_PERSON_IN_LIST":
      return {
        ...state,
        persons: state.persons.map((person) =>
          person._id === action.payload._id ? action.payload : person
        ),
      };
    case "REMOVE_PERSON_FROM_LIST":
      return {
        ...state,
        persons: state.persons.filter(
          (person) => person._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const PersonProvider = ({ children }) => {
  const [cookies] = useCookies(["token"]);
  const [state, dispatch] = useReducer(personReducer, initialState);

  const value = {
    state,
    dispatch,
    token: cookies.token,
  };

  return (
    <PersonContext.Provider value={value}>{children}</PersonContext.Provider>
  );
};

export const usePersonContext = () => {
  const context = useContext(PersonContext);
  if (!context) {
    throw new Error("usePersonContext must be used within a PersonProvider");
  }
  return context;
};
