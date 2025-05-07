import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { useAuth } from "../../providers/AuthProvider";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export default function Header() {
  const [cookies, setCookies, removeCookie] = useCookies(["token"]);
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
    <div>
      <div>
        {!isAuthenticated ? (
          <>
            <button onClick={() => navigate(routes.login())}>Login</button>
            <button onClick={() => navigate(routes.register())}>
              Register
            </button>
          </>
        ) : (
          <button onClick={logOutHandler}>Logout</button>
        )}
      </div>
    </div>
  );
}
