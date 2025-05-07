import "./App.scss";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import HomePage from "./pages/Home/HomePage";
import { routes } from "./routes";
import Header from "./components/Header/Header";
import LogoutPage from "./pages/LogoutPage/LogoutPage";

const API_HOST = import.meta.env.VITE_API_HOST;

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={routes.login()} element={<LoginPage />} />
        <Route path={routes.register()} element={<RegisterPage />} />
        <Route path={routes.notFound()} element={<NotFoundPage />} />
        <Route path={routes.home()} element={<HomePage />} />
        <Route path={routes.logout()} element={<LogoutPage />} />
      </Routes>
    </>
  );
}

export default App;
