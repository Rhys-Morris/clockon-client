import { sortByDate } from "../helpers/helper";

const clientCardReducer = (state, action) => {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.data, error: null };
    case "setEmail":
      return { ...state, email: action.data, error: null };
    case "setContact":
      return { ...state, contact: action.data, error: null };
    case "setActive":
      return { ...state, active: action.data, error: null };
    case "setEdit":
      return { ...state, edit: action.data, error: null };
    case "request":
      return { ...state, error: null, loading: true };
    case "error":
      return { ...state, error: action.data, loading: false };
    case "resetCard":
      return { ...state, ...action.data };
    default:
      return { ...state };
  }
};

const clientsReducer = (state, action) => {
  switch (action.type) {
    case "request":
      return { ...state, loading: true, error: null };
    case "success":
      return {
        ...state,
        loading: false,
        error: null,
        clients: action.data,
        filteredClients: action.data,
      };
    case "failure":
      return { ...state, loading: false, error: action.data };
    case "setClients":
      return { ...state, clients: action.data };
    case "setFiltered":
      return { ...state, filteredClients: action.data };
    default:
      return { ...state };
  }
};

const projectsReducer = (state, action) => {
  switch (action.type) {
    case "request":
      return { ...state, error: null, loading: true };
    case "setProjects": {
      return { ...state, projects: action.data, error: null, loading: false };
    }
    case "setError": {
      return { ...state, error: action.data, loading: false };
    }
    case "setFilteredProjects": {
      return { ...state, filteredProjects: action.data };
    }
    case "setFilterProjectName": {
      return { ...state, filterProjectName: action.data };
    }
    case "setFilterClient": {
      return { ...state, filterClient: action.data };
    }
    case "setFilterBillable": {
      return { ...state, filterBillable: action.data };
    }
    case "setFilterActive": {
      return { ...state, filterActive: action.data };
    }
    case "sortDueDateFirst": {
      const sortedProjects = sortByDate(state.projects, "first", "due_date");
      return { ...state, projects: sortedProjects, dueDateSortedFirst: true };
    }
    case "sortDueDateLast": {
      const sortedProjects = sortByDate(state.projects, "last", "due_date");
      return { ...state, projects: sortedProjects, dueDateSortedFirst: false };
    }
    default:
      return { ...state };
  }
};

const projectReducer = (state, action) => {
  switch (action.type) {
    case "request":
      return { ...state, loading: true, error: null };
    case "success":
      return {
        ...state,
        loading: false,
        project: action.project,
        tasks: action.tasks,
        expenses: action.expenses,
        workPeriods: action.workPeriods,
      };
    case "failure":
      return { ...state, loading: false, error: action.data };
    case "setClient":
      return { ...state, client: action.data };
    case "updateTasks":
      return { ...state, tasks: action.data };
    case "updateExpenses":
      return { ...state, expenses: action.data };
    case "updateWorkPeriods":
      return { ...state, workPeriods: action.data };
    case "setError":
      return { ...state, error: action.data };
    default:
      return { ...state };
  }
};

const dashReducer = (state, action) => {
  switch (action.type) {
    case "request":
      return { ...state, loading: true, error: null };
    case "success":
      return {
        ...state,
        loading: false,
        error: null,
        tasks: action.tasks,
        workPeriods: action.work_periods,
        active: action.active,
        nextProject: action.nextProject,
        user: action.user,
      };
    case "failure":
      return { ...state, loading: false, error: action.data };
    case "setPeriod":
      return { ...state, period: action.data };
    case "updateWorkPeriods":
      return {
        ...state,
        workPeriods: action.data,
        loading: false,
        error: null,
      };
    default:
      return { ...state };
  }
};

export {
  clientCardReducer,
  clientsReducer,
  projectsReducer,
  projectReducer,
  dashReducer,
};
