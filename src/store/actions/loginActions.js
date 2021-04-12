import { saveToLS, deleteFromLS } from '../../services';
import { endpointLS } from '../../services/localStorage';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

const loginUser = (payload) => ({
  type: LOGIN_USER, payload,
});

const logoutUser = (payload) => ({
  type: LOGOUT_USER, payload,
});

export function loginUserAction(email) {
  return (dispatch) => {
    const {
      mealsToken,
      cocktailsToken,
      doneRecipes,
      inProgressRecipes,
      favoriteRecipes,
    } = endpointLS;

    saveToLS('user', { email });
    saveToLS('inProgressRecipe', inProgressRecipes);
    saveToLS('mealsToken', mealsToken);
    saveToLS('cocktailsToken', cocktailsToken);
    saveToLS('doneRecipes', doneRecipes);
    saveToLS('favoriteRecipes', favoriteRecipes);
    dispatch(loginUser());
  };
}

export function logoutUserAction() {
  return (dispatch) => {
    deleteFromLS('user');
    dispatch(logoutUser());
  };
}
