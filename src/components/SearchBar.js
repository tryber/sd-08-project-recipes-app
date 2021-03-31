import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

import '../styles/SearchBar.css';

function SearchBar(props) {
  const { title } = props;
  const { setSearchType,
    setSearchInputValue,
    searchInputValue,
    searchType,
    searchBarRequestDrink,
    searchBarRequestFood,
    meals,
    shouldRedirect,
  } = useContext(RecipeContext);
  const history = useHistory();

  const requestAPI = async (value) => {
    if (value === 'Comidas') {
      await searchBarRequestFood(searchType, searchInputValue);
    }
    if (value === 'Bebidas') {
      await searchBarRequestDrink(searchType, searchInputValue);
    }
  };

  const redirect = (value) => {
    if (meals.length === 1) {
      if (value === 'Comidas') {
        history.push(`/comidas/${meals[0].idMeal}`);
      }
      if (value === 'Bebidas') {
        history.push(`/bebidas/${meals[0].idDrink}`);
      }
    }
  };

  return (
    <div className="search-body">
      {shouldRedirect && redirect(title)}
      <input
        type="text"
        data-testid="search-input"
        value={ searchInputValue }
        onChange={ ({ target }) => setSearchInputValue(target.value) }
      />
      <label htmlFor="ingrediente">
        <input
          type="radio"
          name="searchRadio"
          id="ingrediente"
          data-testid="ingredient-search-radio"
          value="ingrediente"
          defaultChecked
          onChange={ ({ target }) => setSearchType(target.value) }
        />
        ingrediente
      </label>
      <label htmlFor="nome">
        <input
          type="radio"
          name="searchRadio"
          id="nome"
          data-testid="name-search-radio"
          value="nome"
          onChange={ ({ target }) => setSearchType(target.value) }
        />
        nome
      </label>
      <label htmlFor="primeira-letra">
        <input
          type="radio"
          name="searchRadio"
          id="primeira-letra"
          data-testid="first-letter-search-radio"
          value="primeira letra"
          onChange={ ({ target }) => setSearchType(target.value) }
        />
        primeira letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => requestAPI(title) }
      >
        Buscar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SearchBar;
