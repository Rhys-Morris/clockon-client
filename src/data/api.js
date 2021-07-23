import axios from "axios";

// ------ CLIENTS ------
const AUTH_HEADER = {
  headers: {
    Authorization: "Bearer " + sessionStorage.getItem("token"),
  },
};

const getClients = () => {
  return axios
    .get("http://localhost:4000/clients", AUTH_HEADER)
    .then((res) => res.data);
};

const destroyClient = (id) => {
  return axios
    .delete(`http://localhost:4000/clients/${id}`, AUTH_HEADER)
    .then((res) => res.data);
};

const updateClient = (clientDetails) => {
  const { id, name, contact, email, active } = clientDetails;
  return axios
    .put(
      `http://localhost:4000/clients/${id}`,
      {
        client: {
          name,
          contact,
          email,
          active,
        },
      },
      AUTH_HEADER
    )
    .then((res) => res.data);
};

export { getClients, destroyClient, updateClient };
