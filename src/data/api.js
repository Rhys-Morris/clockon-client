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

const addClient = (clientDetails) => {
  const { name, contact, email } = clientDetails;
  return axios
    .post(
      "http://localhost:4000/clients",
      {
        client: {
          name,
          contact,
          email,
          active: true,
        },
      },
      AUTH_HEADER
    )
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

// ----- PROJECTS -----

const getProjects = () => {
  return axios
    .get("http://localhost:4000/projects", AUTH_HEADER)
    .then((res) => res.data);
};

const getProject = (id) => {
  return axios
    .get(`http://localhost:4000/projects/${id}`, AUTH_HEADER)
    .then((res) => res.data);
};

const addProject = (projectDetails) => {
  const { name, color, billable, clientId, dueDate } = projectDetails;
  return axios
    .post(
      "http://localhost:4000/projects",
      {
        project: {
          name,
          color,
          billable,
          hours: 0,
          active: true,
          client_id: clientId,
          due_date: dueDate,
        },
      },
      AUTH_HEADER
    )
    .then((res) => res.data);
};

const destroyProject = (id) => {
  return axios
    .delete(`http://localhost:4000/projects/${id}`, AUTH_HEADER)
    .then((res) => res.data);
};

export {
  getClients,
  destroyClient,
  updateClient,
  addClient,
  getProjects,
  getProject,
  addProject,
  destroyProject,
};
