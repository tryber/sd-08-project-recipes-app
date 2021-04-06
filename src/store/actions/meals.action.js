export const fetchMeals = () => (dispatch) => {
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((data) => dispatch({ type: 'FETCH_MEALS', payload: data.meals }));
  fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef')
    .then((response) => response.json())
    .then((data) => dispatch({ type: 'FETCH_BEEF_MEALS', payload: data.meals }));
  fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast')
    .then((response) => response.json())
    .then((data) => dispatch({ type: 'FETCH_BREAKFAST_MEALS', payload: data.meals }));
  fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken')
    .then((response) => response.json())
    .then((data) => dispatch({ type: 'FETCH_CHICKEN_MEALS', payload: data.meals }));
  fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert')
    .then((response) => response.json())
    .then((data) => dispatch({ type: 'FETCH_DESSERT_MEALS', payload: data.meals }));
  fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat')
    .then((response) => response.json())
    .then((data) => dispatch({ type: 'FETCH_GOAT_MEALS', payload: data.meals }));
};

export default fetchMeals;
