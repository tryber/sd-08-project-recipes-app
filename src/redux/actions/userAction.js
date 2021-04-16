import { LOGIN_USER } from './index';

const userAction = (user) => ({
  type: LOGIN_USER,
  payload: {
    user,
  },
});

export default userAction;
