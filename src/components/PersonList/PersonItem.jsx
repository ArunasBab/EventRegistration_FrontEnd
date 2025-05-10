import { memo } from "react";
import useHttp from "../../hooks/useHttp";
import api from "../../api/personApi";
import Button from "../UI/Button";
import styles from "./PersonList.module.scss";
import { usePersonContext } from "../../context/PersonContext";

const PersonItem = ({ person }) => {
  const { dispatch, token } = usePersonContext();
  const { sendRequest } = useHttp();

  const handleEdit = () => {
    dispatch({ type: "SET_EDITING_PERSON", payload: person });
  };

  const handleDelete = async () => {
    if (window.confirm("Ar tikrai norite ištrinti šį asmenį?")) {
      try {
        await sendRequest(() => api.deletePerson(person._id, token));
        dispatch({ type: "REMOVE_PERSON_FROM_LIST", payload: person._id });
      } catch (error) {
        console.error("Klaida trinant asmenį:", error);
      }
    }
  };

  return (
    <tr>
      <td>{person.fullName}</td>
      <td>{person.email}</td>
      <td>{new Date().getFullYear() - person.age}</td>
      <td className={styles.actions}>
        <Button onClick={handleEdit} small>
          Redaguoti
        </Button>
        <Button onClick={handleDelete} small danger>
          Ištrinti
        </Button>
      </td>
    </tr>
  );
};

export default memo(PersonItem);
