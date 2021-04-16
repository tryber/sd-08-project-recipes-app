import { FILTER_MEAL_CAT } from './index';

const filterMealCatsAction = (mealFilter) => ({
  type: FILTER_MEAL_CAT,
  payload: {
    mealFilter,
  },
});

export default filterMealCatsAction;
