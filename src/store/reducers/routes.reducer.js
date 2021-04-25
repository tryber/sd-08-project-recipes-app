const INITIAL_STATE = {
  rota: '/',
  detalhes: {},
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GERA_ROTA':
    return { ...state, rota: action.rota };
  case 'COMIDA_DETALHES':
    return { ...state, detalhes: action.detalhes };
  default:
    return state;
  }
}
