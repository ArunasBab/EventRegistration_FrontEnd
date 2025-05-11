import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST;

export async function loginHandle({ email, password }) {
  const response = await axios.post(`${API_HOST}/login`, {
    email,
    password,
  });
  return response.data;
}

export async function registerHandle(user) {
  const response = await axios.post(`${API_HOST}/register`, user);
  return response.data;
}

export async function getCurrentUser(token) {
  const response = await axios.get(`${API_HOST}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
