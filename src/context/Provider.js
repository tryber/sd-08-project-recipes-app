import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import LariContext from './Context';
import { headerSearch, fetchFood, fetchDrink } from '../services';

const Provider = ({ children }) => {
  const history = useHistory();
  const redirectPages = (path) => {
    history.push(path);
  };
  const [food, setFood] = useState([]);
  const [drink, setDrink] = useState([]);
  const [nameIngredient, setNameIngredient] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isMeal, setIsMeal] = useState(true);
  const [foodDetails, setFoodDetails] = useState({});
  // const [ingredients, setIngredients] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [usedIngri, setUseIngri] = useState(['ElisaEumaGenia']);
  const [inProgress, setInProgress] = useState({});
  const [favoriteRecipe, setFavoriteRecipe] = useState({});
  const setMeals = async (array) => {
    if (array.meals === null) {
      // eslint-disable-next-line no-alert
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (array.meals.length === 1) {
      const { idMeal } = array.meals[0];
      redirectPages(`/comidas/${idMeal}`);
    } else {
      setFood(array ? array.meals : []);
    }
  };
  const setDrinks = async (array = { drinks: [] }) => {
    if (array.drinks === null) {
      // eslint-disable-next-line no-alert
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (array.drinks.length === 1) {
      const { idDrink } = array.drinks[0];
      redirectPages(`/bebidas/${idDrink}`);
    } else {
      setDrink(array ? array.drinks : []);
    }
  };

  const recipesFetch = async (isMeals) => {
    let results = {};
    if (isMeals) {
      results = await fetchFood();
      setFood(results.meals);
    } else {
      results = await fetchDrink();
      setDrink(results.drinks);
    }
    return results;
  };

  const handleHeaderSearch = async (search, type, typeAPI) => {
    const isDrinkApi = typeAPI === 'Bebidas';
    const results = await headerSearch(search, type, isDrinkApi);
    if (isDrinkApi) {
      setDrinks(results);
    } else {
      setMeals(results);
    }
  };

  const saveFavoriteRecipes = () => {
    let results = {};
    if (isMeal) {
      results = {
        id: foodDetails.idMeal,
        type: 'comida',
        area: foodDetails.strArea,
        category: foodDetails.strCategory,
        alcoholicOrNot: '',
        name: foodDetails.strMeal,
        image: foodDetails.strMealThumb,
      };
    } else {
      results = {
        id: foodDetails.idDrink,
        type: 'bebida',
        area: '',
        category: foodDetails.strCategory,
        alcoholicOrNot: foodDetails.strAlcoholic,
        name: foodDetails.strDrink,
        image: foodDetails.strDrinkThumb,
      };
    }
    return results;
    // setFavoriteRecipe(results);
  };
  const handleIsFavorite = (favorite) => {
    // const [,, id] = location.pathname.split('/');
    const savedFavoriteRecipe = saveFavoriteRecipes();
    localStorage.setItem('isFavorite', favorite);
    setIsFavorite(favorite);
    const recipeFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    let result = '';
    if (favorite) {
      result = [...recipeFavorite, savedFavoriteRecipe];
    } else if (isMeal) {
      result = recipeFavorite.filter((recipe) => recipe.id !== foodDetails.idMeal);
    } else {
      result = recipeFavorite.filter((recipe) => recipe.id !== foodDetails.idDrink);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(result));
  };
  // console.log(drink);

  const context = {
    handleHeaderSearch,
    food,
    drink,
    recipesFetch,
    nameIngredient,
    setNameIngredient,
    isFavorite,
    setIsFavorite,
    isMeal,
    setIsMeal,
    foodDetails,
    setFoodDetails,
    hidden,
    setHidden,
    usedIngri,
    setUseIngri,
    inProgress,
    setInProgress,
    handleIsFavorite,
    favoriteRecipe,
    setFavoriteRecipe,
  };
  return (
    <div>
      <LariContext.Provider value={ context }>
        {children}
      </LariContext.Provider>
    </div>
  );
};
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
