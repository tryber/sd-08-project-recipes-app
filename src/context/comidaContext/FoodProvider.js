import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import FoodContext from './FoodContext';
import { requestMealRecipe, SearchMealByIngredient } from '../../services/API';
import GlobalContext from '../globalContext/GlobalContext';

function FoodProvider({ children }) {
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('');
  const [foods, setFoods] = useState([]);
  const { values: { fetchExploreIngredients,
    exploreIngredients } } = useContext(GlobalContext);

  const handleSearchInput = ({ target }) => setSearchInput(target.value);
  const handleSearchType = ({ target }) => setSearchType(target.value);

  useEffect(() => {
    if (fetchExploreIngredients) {
      SearchMealByIngredient(exploreIngredients).then(({ meals }) => setFoods(meals));
    } else {
      requestMealRecipe().then(({ meals }) => setFoods(meals));
    }
  }, [fetchExploreIngredients, exploreIngredients]);

  const [detailFoods, setDetailsFoods] = useState([]);
  const [recomendations, setRecomendations] = useState([]);

  const [doneRecipe, setDoneRecipe] = useState([]);

  const provide = {
    values: {
      searchInput,
      searchType,
      foods,
      detailFoods,
      recomendations,
      doneRecipe,
    },
    functions: {
      handleSearchInput,
      handleSearchType,
      setFoods,
      setDetailsFoods,
      setRecomendations,
      setDoneRecipe,
    },
  };

  return (
    <FoodContext.Provider value={ provide }>
      {children}
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodProvider;
