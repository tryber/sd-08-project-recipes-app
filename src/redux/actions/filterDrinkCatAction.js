import { FILTER_DRINK_CAT } from './index';

const filterDrinkCatsAction = (drinkFilter) => ({
  type: FILTER_DRINK_CAT,
  payload: {
    drinkFilter,
  },
});

export default filterDrinkCatsAction;
