import { AUTH_SET_TOKEN, AUTH_SET_UID } from "../actions/actionTypes";

const initialState = {
  token: null,
  uid: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token
      };
      case AUTH_SET_UID:
      return {
        ...state,
        uid: action.uid
      };
    default:
      return state;
  }
};

export default reducer;
