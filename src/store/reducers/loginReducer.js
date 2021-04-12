import {
  LOGIN_USER,
  LOGOUT_USER,
} from '../actions/loginActions';

const INITIAL_STATE_USER = {
  email: null,
};
export default function loginReducer(state = INITIAL_STATE_USER, action) {
  switch (action.type) {
  case LOGIN_USER:
    return {
      ...state, email: action.payload };
  case LOGOUT_USER:
    return {
      ...state, email: null };
  default:
    return state;
  }
}
