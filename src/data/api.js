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

const updateProject = (projectDetails) => {
  const { id, name, color, billable, active, clientId, dueDate } =
    projectDetails;
  return axios
    .put(
      `http://localhost:4000/projects/${id}`,
      {
        project: {
          name,
          color,
          billable,
          active,
          client_id: clientId,
          due_date: dueDate,
        },
      },
      AUTH_HEADER
    )
    .then((res) => res.data);
};

const createTask = (task) => {
  return axios
    .post(
      `http://localhost:4000/tasks/${task.project_id}`,
      {
        task: {
          ...task,
          completed: false,
        },
      },
      AUTH_HEADER
    )
    .then((res) => res.data);
};

const updateTask = (task) => {
  return axios
    .put(
      `http://localhost:4000/tasks/${task.project_id}/${task.id}`,
      {
        task: {
          ...task,
        },
      },
      AUTH_HEADER
    )
    .then((res) => res.data);
};

const destroyTask = (projectId, taskId) => {
  return axios
    .delete(`http://localhost:4000/tasks/${projectId}/${taskId}`, AUTH_HEADER)
    .then((res) => res.data);
};

const createExpense = (expense) => {
  return axios
    .post(
      `http://localhost:4000/expenses/${expense.project_id}`,
      {
        expense,
      },
      AUTH_HEADER
    )
    .then((res) => res.data);
};

const updateExpense = (expense) => {
  return axios
    .put(
      `http://localhost:4000/expenses/${expense.project_id}/${expense.id}`,
      {
        expense,
      },
      AUTH_HEADER
    )
    .then((res) => res.data);
};

const destroyExpense = (projectId, taskId) => {
  return axios
    .delete(
      `http://localhost:4000/expenses/${projectId}/${taskId}`,
      AUTH_HEADER
    )
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
  updateProject,
  createTask,
  updateTask,
  destroyTask,
  createExpense,
  updateExpense,
  destroyExpense,
};
