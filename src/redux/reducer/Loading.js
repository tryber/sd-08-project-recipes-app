import { IS_LOADING } from '../actions';

const INITIAL_STATE = {
  isLoading: true,
};

const Loading = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_LOADING:
    return {
      isLoading: action.payload.isLoading,
    };
  default:
    return state;
  }
};

export default Loading;
