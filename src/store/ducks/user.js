export const Types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

const user = (state = {}, action) => {
  switch (action.type) {
  case Types.LOGIN:
    return { ...state, isAuthenticated: true, email: action.payload };
  case Types.LOGOUT:
    return { ...state, isAuthenticated: false, email: '' };
  default: return state;
  }
};

export const Creators = {
  login: (userData) => ({
    type: Types.LOGIN,
    payload: userData,
  }),

  logout: () => ({
    type: Types.LOGOUT,
  }),
};

export default user;
