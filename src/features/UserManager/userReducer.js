export const initialState = {
  users: [],
  loading: false,
  error: null,
  selectedUser: null,
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USERS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case "FETCH_USERS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "SELECT_USER":
      return {
        ...state,
        selectedUser: action.payload,
      };
    case "DELETE_USERS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "DELETE_USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case "DELETE_USERS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
