import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST;

export async function loginHandle({ email, password }) {
  const response = await axios.post(`${API_HOST}/login`, {
    email,
    password,
  });
  const data = response.data;

  return data;
}
