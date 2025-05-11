import { useState } from "react";
import { useCookies } from "react-cookie";
import { loginHandle } from "../../api/authApi";
import { AxiosError } from "axios";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import Button from "../../components/UI/Button";
import styles from "./LoginRegisterPage.module.scss";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookies] = useCookies(["token"]);
  const [error, setError] = useState("");

  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const submitHandle = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { token } = await loginHandle({ email, password });
      setCookies("token", token);
      setIsAuthenticated(true);
      navigate(routes.loginRegistration());
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <form onSubmit={submitHandle}>
          <div>
            <label htmlFor="input-email">El.Paštas</label>
            <input
              type="email"
              id="input-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>

          <div>
            <label htmlFor="input-password">Slaptažodis</label>
            <input
              type="password"
              id="input-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          {error && <p className={styles.paragraph}>{error}</p>}
          <div className={styles.button}>
            <Button type="submit">Prisijungti</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
