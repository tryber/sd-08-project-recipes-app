import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import getApi from '../services/apiRequests';

export default function Provider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [recipeDetail, setRecipeDetail] = useState([]);
  const [recipesInProgress, setRecipesInProgress] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useState({
    searchInput: '',
    selectedParameter: 'none',
    location: '',
  });

  const { searchInput, selectedParameter, location } = searchParams;

  useEffect(() => {
    let domain = '';
    if (location.includes('comidas')) {
      domain = 'themealdb';
    } else if (location.includes('bebidas')) {
      domain = 'thecocktaildb';
    }

    switch (selectedParameter) {
    case 'ingredient':
      getApi(domain, `filter.php?i=${searchInput}`)
        .then((response) => setRecipes(response));
      break;

    case 'name':
      getApi(domain, `search.php?s=${searchInput}`)
        .then((response) => setRecipes(response));
      break;

    case 'first-letter':
      getApi(domain, `search.php?f=${searchInput}`)
        .then((response) => setRecipes(response));
      break;

    case 'category':
      getApi(domain, `filter.php?c=${searchInput}`)
        .then((response) => setRecipes(response));
      break;

    case 'recipe':
      getApi(domain, `lookup.php?i=${searchInput}`)
        .then((response) => setRecipeDetail(response));
      break;

    case 'none':
      if (domain) {
        getApi(domain, 'search.php?s=')
          .then((response) => setRecipes(response));
        getApi(domain, 'list.php?c=list')
          .then((response) => response.map((category) => category.strCategory))
          .then((response) => setCategories(['All', ...response]));
      }
      break;

    default:
      break;
    }
  }, [location, searchInput, searchParams, selectedParameter]);

  const context = {
    setSearchParams,
    setRecipesInProgress,
    searchParams,
    recipes,
    categories,
    recipeDetail,
    recipesInProgress,
  };

  return <Context.Provider value={ context }>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
