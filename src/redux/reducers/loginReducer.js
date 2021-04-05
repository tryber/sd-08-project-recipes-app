import { REDIRECT_LOGIN } from '../actions';

const INITIAL_STATE = {
  loginRedirect: false,
};

export default function loginReducer(state = INITIAL_STATE, { type }) {
  switch (type) {
  case REDIRECT_LOGIN:
    return {
      ...state,
      loginRedirect: !state.loginRedirect,
    };
  default:
    return state;
  }
}
