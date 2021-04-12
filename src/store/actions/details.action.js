import {
  getMealsDetails,
  getDrinksDetails,
  getMealsByRandom,
  getDrinksByRandom,
} from '../../services/fetchData';

import filtered from '../../utils/filterDetailsRecipes';

import {
  RECIPE_DETAILS_FETCH,
  RECIPE_DETAILS_FETCH_SUCCESS_DATA,
  // RECIPE_DETAILS_FETCH_ERROR,
} from './constants';

const recipeFetch = () => ({
  type: RECIPE_DETAILS_FETCH,
});

const recipeFetchSuccessData = (payload) => ({
  type: RECIPE_DETAILS_FETCH_SUCCESS_DATA,
  payload,
});

// const recipeFetchErrored = (error) => ({
//   type: RECIPE_DETAILS_FETCH_ERROR,
//   error,
// });

export default (pathname) => (dispatch) => {
  const [id, type] = pathname.split('/').reverse();

  const fetcherRecipe = type === 'comidas'
    ? getMealsDetails
    : getDrinksDetails;
  const fetcherRecommendations = type === 'comidas'
    ? getDrinksByRandom
    : getMealsByRandom;
  dispatch(recipeFetch());
  Promise
    .all([fetcherRecipe(id), fetcherRecommendations()])
    .then((recipe) => {
      const story = [{
        recipe: [],
        recommendations: [],
      }];
      if (type === 'comidas') {
        const mealsDetails = filtered(recipe[0], 'meals');
        const drinksRecommendations = recipe[1].drinks;
        Object.assign(story, {
          ...story,
          recipe: mealsDetails,
          recommendations: drinksRecommendations,
        });
      } else {
        // console.log(recipe);
        const drinksDetails = filtered(recipe[0], 'drinks');
        const mealsRecommendations = recipe[1].meals;
        Object.assign(story, {
          recipe: drinksDetails,
          recommendations: mealsRecommendations,
        });
      }
      dispatch(recipeFetchSuccessData(story));
    }).then(() => dispatch(recipeFetch()));
};

// Ls tem o is da receitas, cada receita tem um array com o checks que foram
// Pegar a key no LS
// Check se a receita já existe no LS
// Se ela existir a gente pegar os dados e retorna
/// Se não existe a gente retorna os da fetch
