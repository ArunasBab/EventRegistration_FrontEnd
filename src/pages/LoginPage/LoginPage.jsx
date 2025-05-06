import { useState } from "react";
import { useCookies } from "react-cookie";
import { loginHandle } from "../../api/auth";
import { AxiosError } from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies(["token"]);
  const [error, setError] = useState("");

  const submitHandle = async (e) => {
    e.preventDefault();

    try {
      const { token } = await loginHandle({ email, password });
      setCookies("token", token);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={submitHandle}>
        <label htmlFor="input-email">Email</label>
        <input
          type="email"
          id="input-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>{" "}
        <br />
        <label htmlFor="input-password">Password</label>
        <input
          type="password"
          id="input-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>{" "}
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
