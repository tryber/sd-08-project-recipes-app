import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesContextProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [meal, setMeal] = useState({});
  const [drink, setDrink] = useState({});

  function setShow() {
    const invert = !isShow;
    setIsShow(invert);
  }

  const context = {
    meals,
    setMeals,
    drinks,
    setDrinks,
    setShow,
    isShow,
    meal,
    setMeal,
    drink,
    setDrink,
  };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipesContextProvider;
