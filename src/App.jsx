import styles from "./App.module.scss";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import HomePage from "./pages/Home/HomePage";
import { routes } from "./routes";
import Header from "./components/Header/Header";
import LogoutPage from "./pages/LogoutPage/LogoutPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import { PersonProvider } from "./context/PersonContext";

const API_HOST = import.meta.env.VITE_API_HOST;

function App() {
  return (
    <>
      <PersonProvider>
        <Header />
        <div className={styles.app}>
          <Routes>
            <Route path={routes.login()} element={<LoginPage />} />
            <Route path={routes.register()} element={<RegisterPage />} />
            <Route path={routes.notFound()} element={<NotFoundPage />} />
            <Route path={routes.home()} element={<HomePage />} />
            <Route path={routes.logout()} element={<LogoutPage />} />
            <Route
              path={routes.loginRegistration()}
              element={<RegistrationPage />}
            />
          </Routes>
        </div>
      </PersonProvider>
    </>
  );
}

export default App;
