import { ADD_TOKEN_DRINK, ADD_TOKEN_MEAL, ADD_USER } from './index';

const addTokenMeal = (payload) => ({
  type: ADD_TOKEN_MEAL,
  payload,
});

const addTokenDrink = (payload) => ({
  type: ADD_TOKEN_DRINK,
  payload,
});

const addUser = (payload) => ({
  type: ADD_USER,
  payload,
});

const login = (email) => (async (dispatch) => {
  const mealToken = 1;
  const drinkToken = 1;
  dispatch(addTokenDrink(drinkToken));
  dispatch(addTokenMeal(mealToken));
  dispatch(addUser(email));
});

export default login;
