import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { requestMealsByCategory, requestFoodCategory } from '../../services/API';
import GlobalContext from './GlobalContext';

function GlobalProvider({ children }) {
  const [email, setEmail] = useState('');
  const [foodCategory, setFoodCategory] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const [filteredMeals, setFilteredMeals] = useState([]);

  const [fetchExploreIngredients, setFetchExploreIngredients] = useState(false);
  const [exploreIngredients, setExploreIngredients] = useState('');

  const handleEmail = ({ target }) => setEmail(target.value);
  const handleFetchExploreIngredients = () => setFetchExploreIngredients(true);

  const handleExploreIngredients = ({ target }) => {
    const value = target.alt ? target.alt : target.innerText;
    setExploreIngredients(value);
    handleFetchExploreIngredients();
  };

  const handleFilteredMeals = async ({ target }) => {
    const categoryName = target.innerText;
    if (categoryName === 'All') return setFilteredMeals([]);
    if (filteredMeals.length === 0 || currentCategory !== categoryName) {
      setCurrentCategory(categoryName);
      const result = await requestMealsByCategory(categoryName);
      setFilteredMeals(result.meals);
    } else {
      setFilteredMeals([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await requestFoodCategory();
      setFoodCategory(result.meals);
    };
    fetchData();
  }, []);

  const provide = {
    values: {
      email,
      foodCategory,
      filteredMeals,
      fetchExploreIngredients,
      exploreIngredients,
    },
    functions: {
      setEmail,
      handleEmail,
      handleFilteredMeals,
      handleExploreIngredients,
    },
  };
  return (
    <GlobalContext.Provider value={ provide }>
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
