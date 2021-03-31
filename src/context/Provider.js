import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

function Provider({ children }) {
  const [meals, setMeals] = useState([]);
  const [isDrinkLoading, setIsDrinkLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [foodCategory, setFoodCategory] = useState([]);
  const [drinkCategory, setDrinkCategory] = useState([]);
  const [searchType, setSearchType] = useState('ingrediente');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [recommendedFood, setRecommendedFood] = useState([]);
  const [recommendedDrink, setRecommendedDrink] = useState([]);
  const [copied, setCopied] = useState(false);
  const [verifyCheckbox, setVerifyCheckbox] = useState([false]);
  const [receitasFav, setReceitasFav] = useState([]);
  const [cameFromIngredients, setCameFromIngredients] = useState(false);
  const [filterByArea, setFilterByArea] = useState('All');

  const searchBarRequestFood = async (type, inputvalue) => {
    try {
      let response = '';
      if (type === 'ingrediente') {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputvalue}`);
      }
      if (type === 'nome') {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputvalue}`);
      }
      if (type === 'primeira letra') {
        if (inputvalue.length !== 1) {
          return alert('Sua busca deve conter somente 1 (um) caracter');
        }
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputvalue}`);
      }
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.meals === null) {
        throw new Error('Nao existem receitas');
      }
      setMeals(responseJson.meals);
    } catch (error) {
      console.log(error.message);
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return error;
    }
  };

  const searchBarRequestDrink = async (type, inputvalue) => {
    try {
      let response = '';
      if (type === 'ingrediente') {
        response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputvalue}`);
      }
      if (type === 'nome') {
        response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputvalue}`);
      }
      if (type === 'primeira letra') {
        if (inputvalue.length !== 1) {
          return alert('Sua busca deve conter somente 1 (um) caracter');
        }
        response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputvalue}`);
      }
      const responseJson = await response.json();
      if (responseJson.drinks === null) {
        throw new Error('Nao existem receitas');
      }
      setMeals(responseJson.drinks);
    } catch (error) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return error;
    }
  };

  const directRequestFood = async () => {
    setIsDrinkLoading(true);
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const result = await response.json();
    setMeals(result.meals);
    setIsDrinkLoading(false);
  };

  const directRequestDrink = async () => {
    setIsDrinkLoading(true);
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const result = await response.json();
    setMeals(result.drinks);
    setIsDrinkLoading(false);
  };

  const requestFoodCategory = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const result = await response.json();
    setFoodCategory(result.meals);
  };

  const requestDrinkCategory = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const result = await response.json();
    setDrinkCategory(result.drinks);
  };

  useEffect(() => {
    setShouldRedirect(true);
  }, [meals]);

  useEffect(() => {
    requestDrinkCategory();
    requestFoodCategory();
  }, []);

  const context = {
    copied,
    setCopied,
    recommendedFood,
    recommendedDrink,
    setRecommendedFood,
    setRecommendedDrink,
    setIsDrinkLoading,
    setMeals,
    foodCategory,
    drinkCategory,
    directRequestFood,
    isDrinkLoading,
    setShouldRedirect,
    directRequestDrink,
    setSearchType,
    searchType,
    setSearchInputValue,
    searchInputValue,
    searchBarRequestDrink,
    searchBarRequestFood,
    meals,
    shouldRedirect,
    verifyCheckbox,
    setVerifyCheckbox,
    setReceitasFav,
    receitasFav,
    cameFromIngredients,
    setCameFromIngredients,
    filterByArea,
    setFilterByArea,
  };

  return (
    <RecipeContext.Provider value={ context }>
      {children}
    </RecipeContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Provider;
