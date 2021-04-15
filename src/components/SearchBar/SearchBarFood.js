import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import FoodContext from '../../context/comidaContext/FoodContext';
import {
  SearchMealByIngredient,
  SearchMealByName,
  SearchMealByFirstLetter,
} from '../../services/API';
import { alertSearchRecipeNotFound, alertSearchACaracter } from '../../serviceWorker';

function SearchBarFood() {
  const {
    values: {
      searchInput,
      searchType,
      foods,
    },
    functions: {
      handleSearchInput,
      handleSearchType,
      setFoods,
    },
  } = useContext(FoodContext);

  const [redirect, setRedirect] = useState(false);
  const [path, setPath] = useState(false);

  useEffect(() => {
    if (foods.length === 1) {
      setRedirect(true);
      setPath(`/comidas/${foods[0].idMeal}`);
    }
  }, [foods]);

  const requestAPI = async () => {
    if (searchType === 'first-letter-search' && searchInput.length > 1) {
      alertSearchACaracter();
      return '';
    }
    let response = '';
    if (searchType === 'ingredient-search') {
      response = await SearchMealByIngredient(searchInput);
    }
    if (searchType === 'name-search') {
      response = await SearchMealByName(searchInput);
    }
    if (searchType === 'first-letter-search') {
      response = await SearchMealByFirstLetter(searchInput);
    }
    if (response.meals !== null && searchType !== '') {
      return setFoods(response.meals);
    }
    alertSearchRecipeNotFound();
  };

  if (redirect) return <Redirect to={ path } />;

  return (
    <section className="search-bar-container">
      <input
        type="text"
        data-testid="search-input"
        value={ searchInput }
        onChange={ handleSearchInput }
        className="input-field"
      />
      <label htmlFor="ingredient-search">
        <input
          id="ingredient-search"
          type="radio"
          name="search"
          data-testid="ingredient-search-radio"
          onChange={ handleSearchType }
          value="ingredient-search"
        />
        Buscar por ingrediente
      </label>
      <label htmlFor="name-search">
        <input
          id="name-search"
          type="radio"
          name="search"
          data-testid="name-search-radio"
          onChange={ handleSearchType }
          value="name-search"
        />
        Buscar por nome
      </label>
      <label htmlFor="first-letter-search">
        <input
          id="first-letter-search"
          type="radio"
          name="search"
          data-testid="first-letter-search-radio"
          onChange={ handleSearchType }
          value="first-letter-search"
        />
        Buscar pela primeira letra
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ requestAPI }
        className="page-buttons"
      >
        Procurar
      </button>
    </section>
  );
}

export default SearchBarFood;
