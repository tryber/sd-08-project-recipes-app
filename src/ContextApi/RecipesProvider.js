import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import fetchFood from '../services/Api';
import fetchFood2 from '../services/IdApiFood';
import fetchCockt from '../services/idApiCocktail';

const searchParams = {
  selectedParam: '',
  inputSearch: '',
};

function RecipesProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [searchParam, setSearchParam] = useState(searchParams);

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  console.log(recipes);

  useEffect(() => {
    const { selectedParam, inputSearch } = searchParam;

    switch (selectedParam) {
    case 'ingredient':
      fetchFood(`filter.php?i=${inputSearch}`)
        .then((response) => setRecipes(response));
      break;
    case 'name':
      fetchFood(`search.php?s=${inputSearch}`)
        .then((response) => setRecipes(response));
      break;
    case 'first-letter':
      fetchFood(`search.php?f=${inputSearch}`)
        .then((response) => setRecipes(response));
      break;
    default:
      break;
    }
  }, [searchParam]);

  const provide = {
    email,
    password,
    handleEmail,
    handlePassword,
    searchParam,
    setSearchParam,
    recipes,
  };

  return (
    <RecipesContext.Provider value={ provide }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
