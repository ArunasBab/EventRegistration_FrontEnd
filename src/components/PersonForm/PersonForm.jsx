import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useHttp from "../../hooks/useHttp";
import api from "../../api/personApi";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import styles from "./PersonForm.module.scss";
import { usePersonContext } from "../../context/PersonContext";

const PersonForm = () => {
  const { state, dispatch, token } = usePersonContext();
  const { sendRequest } = useHttp();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const formRef = useRef();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      age: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(2, "Vardas ir pavardė turi būti bent 2 simboliai")
        .max(50, "Vardas ir pavardė negali būti ilgesni nei 50 simbolių")
        .required("Privalomas laukas"),
      email: Yup.string()
        .email("Neteisingas el. pašto formatas")
        .required("Privalomas laukas"),
      age: Yup.number()
        .min(1, "Amžius negali būti mažesnis nei 1")
        .max(120, "Amžius negali būti didesnis nei 120")
        .required("Privalomas laukas")
        .integer("Amžius turi būti sveikas skaičius"),
    }),
    onSubmit: async (values) => {
      try {
        if (state.editingPerson) {
          const updatedPerson = await sendRequest(() =>
            api.updatePerson(state.editingPerson._id, values, token)
          );
          setModalMessage("Vartotojas sėkmingai atnaujintas!");
          dispatch({
            type: "UPDATE_PERSON_IN_LIST",
            payload: updatedPerson,
          });
        } else {
          const newPerson = await sendRequest(() =>
            api.createPerson(values, token)
          );
          setModalMessage("Vartotojas sėkmingai užregistruotas!");
          dispatch({
            type: "ADD_PERSON_TO_LIST",
            payload: newPerson,
          });
        }
        setShowModal(true);
        formik.resetForm();
        dispatch({ type: "RESET_EDITING_PERSON" });
      } catch (error) {
        setModalMessage(error.response?.data?.message || error.message);
        setShowModal(true);
      }
    },
  });

  useEffect(() => {
    if (state.editingPerson) {
      formik.setValues({
        fullName: state.editingPerson.fullName,
        email: state.editingPerson.email,
        age: state.editingPerson.age,
      });
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      formik.resetForm();
    }
  }, [state.editingPerson]);

  const handleCancel = () => {
    formik.resetForm();
    dispatch({ type: "RESET_EDITING_PERSON" });
  };

  return (
    <div className={styles.personForm} ref={formRef}>
      <h2>
        {state.editingPerson ? "Redaguoti vartotoją" : "Naujas vartotojas"}
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="fullName">Vardas ir pavardė</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
          />
        </div>
        {formik.touched.fullName && formik.errors.fullName ? (
          <div className={styles.error}>{formik.errors.fullName}</div>
        ) : null}

        <div className={styles.formGroup}>
          <label htmlFor="email">El. paštas</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
          <div className={styles.error}>{formik.errors.email}</div>
        ) : null}

        <div className={styles.formGroup}>
          <label htmlFor="age">Amžius</label>
          <input
            id="age"
            name="age"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.age}
          />
        </div>
        {formik.touched.age && formik.errors.age ? (
          <div className={styles.error}>{formik.errors.age}</div>
        ) : null}

        <div className={styles.buttons}>
          <Button type="submit">
            {state.editingPerson ? "Atnaujinti" : "Registruoti"}
          </Button>
          {state.editingPerson && (
            <Button type="button" onClick={handleCancel} secondary>
              Atšaukti
            </Button>
          )}
        </div>
      </form>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <p>{modalMessage}</p>
        <Button onClick={() => setShowModal(false)}>Gerai</Button>
      </Modal>
    </div>
  );
};

export default PersonForm;
