import { USER_EMAIL } from '../common/actionsTypes';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_EMAIL:
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default login;
