import React, { useCallback, useState } from 'react';
import { PropTypes } from 'prop-types';
import Context from './Context';
import {
  fetchRecipes,
  fetchRecipeDetails,
  fetchRecommendations,
  fetchRandomRecipe,
} from '../services/RequisicaoApi';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputText, setInputText] = useState('');
  const [radioValue, setRadioValue] = useState('s');
  const [isFetching, setIsFetching] = useState(true);
  const [apiReturn, setApiReturn] = useState(null);
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [copyURL, setCopyURL] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [apiReturnCategory, setApiReturnCategory] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState('');
  // const [copyClipboard, setCopyClipboard] = useState('hidden');
  const [comidas, setComidas] = useState([]);
  const [bebidas, setBebidas] = useState([]);

  // async function requestApiData(endpoint) {
  //   const searchType = radioValue === 'i' ? 'filter' : 'search';
  //   setIsFetching(true);
  //   setApiReturn([await fetchRecipes(endpoint, searchType, radioValue, inputText)]);
  //   setIsFetching(false);
  // }

  const requestApiData = useCallback(async (endpoint) => {
    const searchType = radioValue === 'i' ? 'filter' : 'search';
    setIsFetching(true);
    setApiReturn([await fetchRecipes(endpoint, searchType, radioValue, inputText)]);
    setIsFetching(false);
  }, [inputText, radioValue]);

  async function requestRandomRecipe(endpoint) {
    setIsFetching(true);
    setApiReturn([await fetchRandomRecipe(endpoint)]);
    setIsFetching(false);
  }

  async function requestRecipeDetails(endpoint, recipeId, secondEndpoint) {
    setIsFetching(true);
    setRecipeDetails([await fetchRecipeDetails(endpoint, recipeId)]);
    setRecommendations([await fetchRecommendations(secondEndpoint)]);
    setIsFetching(false);
  }

  async function requestApiCategory() {
    const meals = await fetchRecipes('themealdb', 'list', 'c', 'list');
    const drinks = await fetchRecipes('thecocktaildb', 'list', 'c', 'list');
    setApiReturnCategory([meals, drinks]);
    setIsFetching(false);
  }

  async function onClickCategoryFetch(endpoint, categoria) {
    const recipesByCategory = await fetchRecipes(endpoint, 'filter', 'c', categoria);
    setFilteredRecipes(recipesByCategory);
    setIsFetching(false);
  }

  const context = {
    email,
    setEmail,
    password,
    setPassword,
    inputText,
    setInputText,
    radioValue,
    setRadioValue,
    isFetching,
    apiReturn,
    requestApiData,
    recipeDetails,
    setRecipeDetails,
    requestRecipeDetails,
    recommendations,
    setRecommendations,
    copyURL,
    setCopyURL,
    apiReturnCategory,
    requestApiCategory,
    onClickCategoryFetch,
    filteredRecipes,
    setToggle,
    toggle,
    requestRandomRecipe,
    favorite,
    setFavorite,
    disableButton,
    setDisableButton,
    shouldRedirect,
    setShouldRedirect,
    // copyClipboard,
    // setCopyClipboard,
    comidas,
    setComidas,
    bebidas,
    setBebidas,
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
