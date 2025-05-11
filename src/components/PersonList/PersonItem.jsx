import { memo, useState } from "react";
import useHttp from "../../hooks/useHttp";
import api from "../../api/personApi";
import Button from "../UI/Button";
import styles from "./PersonList.module.scss";
import { usePersonContext } from "../../context/PersonContext";
import Modal from "../UI/Modal";

const PersonItem = ({ person }) => {
  const { dispatch, token } = usePersonContext();
  const { sendRequest } = useHttp();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleEdit = () => {
    dispatch({ type: "SET_EDITING_PERSON", payload: person });
  };

  const handleDelete = async () => {
    try {
      await sendRequest(() => api.deletePerson(person._id, token));
      setModalMessage("Vartotojas sėkmingai ištrintas!");
      setShowModal(true);
      dispatch({ type: "REMOVE_PERSON_FROM_LIST", payload: person._id });
    } catch (error) {
      setModalMessage(error.response?.data?.message || error.message);
      setShowModal(true);
    }
  };

  const confirmDelete = () => {
    setModalMessage("Ar tikrai norite ištrinti šį vartotoją?");
    setShowModal(true);
  };

  return (
    <>
      <tr>
        <td>{person.fullName}</td>
        <td>{person.email}</td>
        <td>{new Date().getFullYear() - person.age}</td>
        <td className={styles.actions}>
          <Button onClick={handleEdit} small>
            Redaguoti
          </Button>
          <Button onClick={confirmDelete} small danger>
            Ištrinti
          </Button>
        </td>
      </tr>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <p>{modalMessage}</p>
        <div className={styles.modalButtons}>
          {modalMessage === "Ar tikrai norite ištrinti šį vartotoją?" ? (
            <>
              <Button onClick={handleDelete}>Taip</Button>
              <Button onClick={() => setShowModal(false)} secondary>
                Atšaukti
              </Button>
            </>
          ) : (
            <Button onClick={() => setShowModal(false)}>Gerai</Button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default memo(PersonItem);
