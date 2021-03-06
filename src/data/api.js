import axios from "axios";
import { getToken } from "../helpers/helper";

const AUTH_HEADER = () => ({
  headers: {
    Authorization: "Bearer " + getToken(),
  },
});
const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://clockon-api.herokuapp.com";

// ----- USERS -----

const register = (newUser) => {
  return axios
    .post(`${URL}/register`, { user: newUser })
    .then((res) => res.data);
};

const login = (email, password) => {
  return axios
    .post(`${URL}/login`, {
      email,
      password,
    })
    .then((res) => res.data);
};

const getUser = () => {
  return axios.get(`${URL}/user`, AUTH_HEADER()).then((res) => res.data);
};

const destroyUser = () => {
  return axios.delete(`${URL}/user`, AUTH_HEADER());
};

// ----- SETTINGS -----

const updateBillableRates = (previousRate, newRate) => {
  return axios
    .post(
      `${URL}/projects/rates/update`,
      { project: { billable_rate: newRate, previous_rate: previousRate } },
      AUTH_HEADER()
    )
    .then((res) => res.data);
};

// ----- DASHBOARD -----

const getDash = () => {
  return axios.get(`${URL}/dash`, AUTH_HEADER()).then((res) => res.data);
};

const updateDash = (query) => {
  return axios
    .get(`${URL}/dash/${query}`, AUTH_HEADER())
    .then((res) => res.data);
};

// ----- CLIENTS -----

const getClients = () => {
  return axios.get(`${URL}/clients`, AUTH_HEADER()).then((res) => res.data);
};

const getClient = (id) => {
  return axios
    .get(`${URL}/clients/${id}`, AUTH_HEADER())
    .then((res) => res.data);
};

const destroyClient = (id) => {
  return axios
    .delete(`${URL}/clients/${id}`, AUTH_HEADER())
    .then((res) => res.data);
};

const addClient = (clientDetails) => {
  const { name, contact, email } = clientDetails;
  return axios
    .post(
      `${URL}/clients`,
      {
        client: {
          name,
          contact,
          email,
          active: true,
        },
      },
      AUTH_HEADER()
    )
    .then((res) => res.data);
};

const updateClient = (clientDetails) => {
  const { id, name, contact, email, active } = clientDetails;
  return axios
    .put(
      `${URL}/clients/${id}`,
      {
        client: {
          name,
          contact,
          email,
          active,
        },
      },
      AUTH_HEADER()
    )
    .then((res) => res.data);
};

// ----- PROJECTS -----

const getProjects = () => {
  return axios.get(`${URL}/projects`, AUTH_HEADER()).then((res) => res.data);
};

const getProject = (id) => {
  return axios
    .get(`${URL}/projects/${id}`, AUTH_HEADER())
    .then((res) => res.data);
};

const addProject = (projectDetails) => {
  const { name, color, billable, clientId, dueDate, billableRate } =
    projectDetails;
  return axios
    .post(
      `${URL}/projects`,
      {
        project: {
          name,
          color,
          billable,
          hours: 0,
          active: true,
          client_id: clientId,
          due_date: dueDate,
          billable_rate: billableRate,
        },
      },
      AUTH_HEADER()
    )
    .then((res) => res.data);
};

const destroyProject = (id) => {
  return axios
    .delete(`${URL}/projects/${id}`, AUTH_HEADER())
    .then((res) => res.data);
};

const updateProject = (projectDetails) => {
  const { id, name, color, billable, active, clientId, dueDate, billableRate } =
    projectDetails;
  return axios
    .put(
      `${URL}/projects/${id}`,
      {
        project: {
          name,
          color,
          billable,
          active,
          client_id: clientId,
          due_date: dueDate,
          billable_rate: billableRate,
        },
      },
      AUTH_HEADER()
    )
    .then((res) => res.data);
};

// ----- TASKS -----

const createTask = (task) => {
  return axios
    .post(
      `${URL}/tasks/${task.project_id}`,
      {
        task: {
          ...task,
          completed: false,
        },
      },
      AUTH_HEADER()
    )
    .then((res) => res.data);
};

const updateTask = (task) => {
  return axios
    .put(
      `${URL}/tasks/${task.project_id}/${task.id}`,
      {
        task: {
          ...task,
        },
      },
      AUTH_HEADER()
    )
    .then((res) => res.data);
};

const destroyTask = (projectId, taskId) => {
  return axios
    .delete(`${URL}/tasks/${projectId}/${taskId}`, AUTH_HEADER())
    .then((res) => res.data);
};

// ----- EXPENSES -----

const createExpense = (expense) => {
  return axios
    .post(
      `${URL}/expenses/${expense.project_id}`,
      {
        ...expense,
      },
      AUTH_HEADER()
    )
    .then((res) => res.data);
};

const updateExpense = (expense, receipt = null) => {
  let toSend;

  if (receipt) {
    toSend = new FormData();
    Object.entries(expense).forEach(([key, value]) => {
      toSend.append(key, value);
    });
    toSend.append("receipt", receipt);
  }
  return axios
    .put(
      `${URL}/expenses/${expense.project_id}/${expense.id}`,
      receipt ? toSend : { ...expense },
      AUTH_HEADER()
    )
    .then((res) => res.data);
};

const destroyExpense = (projectId, expenseId) => {
  return axios
    .delete(`${URL}/expenses/${projectId}/${expenseId}`, AUTH_HEADER())
    .then((res) => res.data);
};

const purgeReceipt = (expense) => {
  return axios
    .delete(`${URL}/receipt/${expense.project_id}/${expense.id}`, AUTH_HEADER())
    .then((res) => res.data);
};

//  ----- WORK PERIODS -----

const getWorkPeriods = () => {
  return axios.get(`${URL}/work`, AUTH_HEADER()).then((res) => res.data);
};

const createWorkPeriod = (workPeriod) => {
  return axios
    .post(
      `${URL}/work/${workPeriod.project_id}`,
      {
        work_period: { ...workPeriod, invoiced: false },
      },
      AUTH_HEADER()
    )
    .then((res) => res.data);
};

const destroyWorkPeriod = (projectId, id) => {
  return axios
    .delete(`${URL}/work/${projectId}/${id}`, AUTH_HEADER())
    .then((res) => res.data);
};

const invoiceWorkPeriods = (projectId) => {
  return axios
    .get(`${URL}/work/${projectId}/invoice`, AUTH_HEADER())
    .then((res) => res.data);
};

const workPeriodsForInvoice = (projectId) => {
  return axios
    .get(`${URL}/work/${projectId}/invoice-creation`, AUTH_HEADER())
    .then((res) => res.data);
};

export {
  register,
  login,
  destroyUser,
  getDash,
  updateDash,
  getClients,
  getClient,
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
  getWorkPeriods,
  createWorkPeriod,
  destroyWorkPeriod,
  getUser,
  invoiceWorkPeriods,
  workPeriodsForInvoice,
  purgeReceipt,
  updateBillableRates,
};
