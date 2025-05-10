import { useEffect } from "react";
import useHttp from "../../hooks/useHttp";
import api from "../../api/personApi";
import styles from "./RegistrationPage.module.scss";
import { usePersonContext } from "../../context/PersonContext";
import PersonForm from "../../components/PersonForm/PersonForm";
import PersonList from "../../components/PersonList/PersonList";
import Loader from "../../components/UI/Loader";

const RegistrationPage = () => {
  const { state, dispatch, token } = usePersonContext();
  const { sendRequest, isLoading, error } = useHttp();

  useEffect(() => {
    const fetchPersons = async () => {
      if (!token) return;

      dispatch({ type: "FETCH_PERSONS_REQUEST" });
      try {
        const data = await sendRequest(() => api.getPersons(token));
        dispatch({ type: "FETCH_PERSONS_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_PERSONS_FAILURE", payload: err.message });
      }
    };

    fetchPersons();
  }, [dispatch, sendRequest, token]);

  if (!token) {
    return (
      <div className={styles.registrationPage}>
        <h1>Prašome prisijungti</h1>
        <p>Norėdami matyti vartotojus, turite prisijungti.</p>
      </div>
    );
  }

  return (
    <div className={styles.registrationPage}>
      <h1>Vartotojų registracija</h1>
      <PersonForm />
      {isLoading && <Loader />}
      {error && <p className={styles.error}>{error}</p>}
      <PersonList
        persons={state.persons}
        isLoading={state.isLoading}
        error={state.error}
      />
    </div>
  );
};

export default RegistrationPage;
