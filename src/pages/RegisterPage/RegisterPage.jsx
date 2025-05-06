import { useState } from "react";
import registerUserSchema from "../../validationSchemas/registerUserSchemas";
import { registerHandle } from "../../api/auth";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function inputChangeHandle(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function submitHandle(e) {
    e.preventDefault();
    console.log(formData);
    try {
      await registerUserSchema.validate(formData);
      await registerHandle(formData);
      navigate(routes.login());
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.error);
      } else {
        alert("validation error: " + error);
      }
    }
  }

  return (
    <form onSubmit={submitHandle}>
      <label htmlFor="name-input">Name</label>
      <input
        type="text"
        id="name-input"
        name="name"
        value={formData.name}
        onChange={inputChangeHandle}
      ></input>{" "}
      <br />
      <label htmlFor="last-name-input">Last name</label>
      <input
        type="text"
        id="last-name-input"
        name="lastName"
        value={formData.lastName}
        onChange={inputChangeHandle}
      ></input>{" "}
      <br />
      <label htmlFor="email-input">Email</label>
      <input
        type="email"
        id="email-input"
        name="email"
        value={formData.email}
        onChange={inputChangeHandle}
      ></input>{" "}
      <br />
      <label htmlFor="password-input">Password</label>
      <input
        type="password"
        id="password-input"
        name="password"
        value={formData.password}
        onChange={inputChangeHandle}
      ></input>{" "}
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
