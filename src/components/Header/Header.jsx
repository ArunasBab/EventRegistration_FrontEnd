import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { useAuth } from "../../providers/AuthProvider";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import styles from "./Header.module.scss";
import Button from "../UI/Button";

export default function Header() {
  const [cookies, _, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated } = useAuth();

  function logOutHandler() {
    removeCookie("token");
    setIsAuthenticated(false);
    navigate(routes.logout());
  }

  useEffect(() => {
    if (!cookies.token) {
      setIsAuthenticated(false);
    }
  }, [cookies, setIsAuthenticated]);

  return (
    <div className={styles.container}>
      <img src="../src/assets/logo.png" alt="Logo" />
      <h1>Renginiai "Lemūras"</h1>
      <div className={styles.box}>
        {!isAuthenticated ? (
          <>
            <Button onClick={() => navigate(routes.login())}>
              Prisijungti
            </Button>
            <Button onClick={() => navigate(routes.register())}>
              Registruoti
            </Button>
          </>
        ) : (
          <Button onClick={logOutHandler}>Atsijungti</Button>
        )}
      </div>
    </div>
  );
}
