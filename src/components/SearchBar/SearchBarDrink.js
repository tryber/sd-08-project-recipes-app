import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import DrinkContext from '../../context/bebidaContext/DrinkContext';
import {
  SearchCocktailByIngredient,
  SearchCocktailByName,
  SearchCocktailByFirstLetter,
} from '../../services/API';
import { alertSearchRecipeNotFound, alertSearchACaracter } from '../../serviceWorker';

function SearchBarFood() {
  const {
    values: {
      searchInput,
      searchType,
      drinks,
    },
    functions: {
      handleSearchInput,
      handleSearchType,
      setDrinks,
    },
  } = useContext(DrinkContext);

  const [redirect, setRedirect] = useState(false);
  const [path, setPath] = useState(false);

  useEffect(() => {
    if (drinks.length === 1) {
      setRedirect(true);
      setPath(`/bebidas/${drinks[0].idDrink}`);
    }
  }, [drinks]);

  const requestAPI = async () => {
    if (searchType === 'first-letter-search' && searchInput.length > 1) {
      alertSearchACaracter();
      return '';
    }
    let response = '';
    if (searchType === 'ingredient-search') {
      response = await SearchCocktailByIngredient(searchInput);
    }
    if (searchType === 'name-search') {
      response = await SearchCocktailByName(searchInput);
    }
    if (searchType === 'first-letter-search') {
      response = await SearchCocktailByFirstLetter(searchInput);
    }
    if (response.drinks !== null && searchType !== '') {
      return setDrinks(response.drinks);
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
        className="search-bar-text-input"
      />
      <label htmlFor="ingredient-search">
        <input
          id="ingredient-search"
          type="radio"
          name="search"
          data-testid="ingredient-search-radio"
          onChange={ handleSearchType }
          value="ingredient-search"
          className="search-bar-radio-input"
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
          className="search-bar-radio-input"
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
          className="search-bar-radio-input"
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
