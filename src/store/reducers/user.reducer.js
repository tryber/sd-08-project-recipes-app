const INITIAL_STATE = {
  email: '',
  bool: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
  case 'USER_LOGIN':
    return { ...state, email: payload };
  case 'BOOLEANO':
    return { ...state, bool: payload };

  default:
    return state;
  }
}
