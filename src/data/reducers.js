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

export { clientCardReducer };
