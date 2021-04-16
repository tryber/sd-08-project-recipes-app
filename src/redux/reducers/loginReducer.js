import { LOGIN_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

export default function LoginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_USER:
    return {
      ...state,
      email: action.payload.user.email,
      password: action.payload.user.password,
    };
  default:
    return state;
  }
}
