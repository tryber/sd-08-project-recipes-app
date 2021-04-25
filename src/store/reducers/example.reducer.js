const INITIAL_STATE = null;

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
  case 'UPDATE_DATA':
    return payload;

  default:
    return state;
  }
}
