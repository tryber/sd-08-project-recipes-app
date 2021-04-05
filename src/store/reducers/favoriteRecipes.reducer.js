const INITIAL_STATE = {};

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
  case 'UPDATE_FAVORITES':
    return payload;

  default:
    return state;
  }
}
