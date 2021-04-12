import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState('');

  // estado responsável por guardar a lista de comidas da pagina inicial
  const [mealData, setMealData] = useState([]);
  const [drinkData, setDrinkData] = useState([]);
  const [ingredientsData, setIngredientsData] = useState([]);
  const [drinkIngredientsData, setDrinksIngredientsData] = useState([]);
  const [mealArea, setMealArea] = useState([{ strArea: 'All' }]);
  const [byIngredient, setByIngredient] = useState(false);
  const [ingredientName, setIngredientName] = useState();
  const [favoriteRecipe, setFavoriteRecipe] = useState([]);
  // const [food, setfood] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const context = {
    data,
    setData: (result) => setData(result),
    user,
    setUser: (email) => setUser(email),
    mealData,
    setMealData,
    drinkData,
    setDrinkData,
    isLoading,
    setIsLoading,
    ingredientsData,
    setIngredientsData,
    drinkIngredientsData,
    setDrinksIngredientsData,
    byIngredient,
    setByIngredient,
    ingredientName,
    setIngredientName,
    setMealArea,
    mealArea,
    setFavoriteRecipe,
    favoriteRecipe,
    // changeTitleByPathName,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
