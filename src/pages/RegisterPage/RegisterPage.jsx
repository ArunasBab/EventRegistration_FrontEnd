import { useState } from "react";
import registerUserSchema from "../../validationSchemas/registerUserSchemas";
import { registerHandle } from "../../api/authApi";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import Modal from "../../components/UI/Modal";
import Button from "../../components/UI/Button";
import styles from "../LoginPage/LoginRegisterPage.module.scss";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function inputChangeHandle(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function submitHandle(e) {
    e.preventDefault();
    setError(null);

    try {
      await registerUserSchema.validate(formData);
      await registerHandle(formData);
      setShowSuccessModal(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.error || "Registracijos klaida");
      } else {
        setError("Validacijos klaida: " + error.message);
      }
    }
  }

  const closeModalAndRedirect = () => {
    setShowSuccessModal(false);
    navigate(routes.login());
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <form onSubmit={submitHandle}>
          <div>
            <label htmlFor="name-input">Vardas </label>
            <input
              type="text"
              id="name-input"
              name="name"
              value={formData.name}
              onChange={inputChangeHandle}
            ></input>
          </div>
          <div>
            <label htmlFor="last-name-input">Pavardė </label>
            <input
              type="text"
              id="last-name-input"
              name="lastName"
              value={formData.lastName}
              onChange={inputChangeHandle}
            ></input>
          </div>
          <div>
            <label htmlFor="email-input">El. paštas </label>
            <input
              type="email"
              id="email-input"
              name="email"
              value={formData.email}
              onChange={inputChangeHandle}
            ></input>
          </div>
          <div>
            <label htmlFor="password-input">Slaptažodis </label>
            <input
              type="password"
              id="password-input"
              name="password"
              value={formData.password}
              onChange={inputChangeHandle}
            ></input>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className={styles.button}>
            <Button type="submit">Registruoti</Button>
          </div>
        </form>

        {/* Sėkmės modalas */}
        <Modal show={showSuccessModal} onClose={closeModalAndRedirect}>
          <p>Vartotojas sėkmingai užregistruotas!</p>
          <Button onClick={closeModalAndRedirect}>Gerai</Button>
        </Modal>
      </div>
    </div>
  );
}
