export const fetchDrinks = () => (dispatch) => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((data) => dispatch({ type: 'FETCH_DRINKS', payload: data.drinks }));
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink')
    .then((response) => response.json())
    .then((data) => dispatch({ type: 'FETCH_ORDINARY_DRINKS', payload: data.drinks }));
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
    .then((response) => response.json())
    .then((data) => dispatch({ type: 'FETCH_COCKTAIL_DRINKS', payload: data.drinks }));
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Milk%20/%20float%20/%20shake')
    .then((response) => response.json())
    .then((data) => dispatch(
      { type: 'FETCH_MILK_FLOAT_SHAKE_DRINKS', payload: data.drinks },
    ));
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other/unknown')
    .then((response) => response.json())
    .then((data) => dispatch(
      { type: 'FETCH_OTHER_UNKNOWN_DRINKS', payload: data.drinks },
    ));
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa')
    .then((response) => response.json())
    .then((data) => dispatch({ type: 'FETCH_COCOA_DRINKS', payload: data.drinks }));
};

export default fetchDrinks;
