import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST;

const getAuthConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const api = {
  getPersons: async (token) => {
    const response = await axios.get(
      `${API_HOST}/persons`,
      getAuthConfig(token)
    );
    return response.data;
  },

  createPerson: async (personData, token) => {
    const response = await axios.post(
      `${API_HOST}/persons`,
      personData,
      getAuthConfig(token)
    );
    return response.data;
  },

  updatePerson: async (personId, personData, token) => {
    const response = await axios.put(
      `${API_HOST}/persons/${personId}`,
      personData,
      getAuthConfig(token)
    );
    return response.data;
  },

  deletePerson: async (personId, token) => {
    const response = await axios.delete(
      `${API_HOST}/persons/${personId}`,
      getAuthConfig(token)
    );
    return response.data;
  },
};

export default api;
