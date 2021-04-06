export const fetchCategories = () => (dispatch) => {
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type: 'FETCH_MEALS_CATEGORIES', payload: data.meals });
    });
  fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type: 'FETCH_DRINKS_CATEGORIES', payload: data.drinks });
    });
};

export default fetchCategories;
