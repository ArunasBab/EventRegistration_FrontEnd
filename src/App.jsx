import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST;

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("dar nieko");

  useEffect(() => {
    axios
      .get(API_HOST)
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((err) => {
        alert(err);
      });
  });

  return (
    <>
      <div>
        <h1>{message}</h1>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
