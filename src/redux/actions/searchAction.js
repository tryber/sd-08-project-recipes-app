import { SEARCH_INPUT } from './index';

const searchAction = (search) => ({
  type: SEARCH_INPUT,
  payload: {
    search,
  },
});

export default searchAction;
