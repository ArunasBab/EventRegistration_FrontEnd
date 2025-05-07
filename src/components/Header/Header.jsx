import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { useAuth } from "../../providers/AuthProvider";
import { useCookies } from "react-cookie";

export default function Header() {
  const [cookies, setCookies, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  function logOutHandler() {
    removeCookie("token");
    navigate(routes.login());
  }

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
