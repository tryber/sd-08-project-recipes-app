export const fetchDrinks = () => (dispatch) => {
  const ORDINARY_DRINKS = 'Ordinary Drink';
  const MILK_FLOAT_SHAKE_DRINKS = 'Milk / Float / Shake';
  const OTHER_UNKNOWN_DRINKS = 'Other/Unknown';
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((data) => dispatch({ type: 'FETCH_DRINKS', payload: data.drinks }));
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${ORDINARY_DRINKS}`)
    .then((response) => response.json())
    .then((data) => dispatch({ type: 'FETCH_ORDINARY_DRINKS', payload: data.drinks }));
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
    .then((response) => response.json())
    .then((data) => dispatch({ type: 'FETCH_COCKTAIL_DRINKS', payload: data.drinks }));
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${MILK_FLOAT_SHAKE_DRINKS}`)
    .then((response) => response.json())
    .then((data) => dispatch(
      { type: 'FETCH_MILK_FLOAT_SHAKE_DRINKS', payload: data.drinks },
    ));
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${OTHER_UNKNOWN_DRINKS}`)
    .then((response) => response.json())
    .then((data) => dispatch(
      { type: 'FETCH_OTHER_UNKNOWN_DRINKS', payload: data.drinks },
    ));
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa')
    .then((response) => response.json())
    .then((data) => dispatch({ type: 'FETCH_COCOA_DRINKS', payload: data.drinks }));
};

export default fetchDrinks;
