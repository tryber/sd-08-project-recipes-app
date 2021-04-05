import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { requestMeals, requestDrinks } from '../../redux/actions';

import './searchBar.css';
import { fetchApi } from '../../services/API';

const alertMessage = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

function SearchBar({ history }) {
  const dispatch = useDispatch();
  const { location: { pathname } } = history;
  const [searchInput, setSearchInput] = useState('');
  const [typeSearch, setTypeSearch] = useState('ingredient');

  async function getSearch() {
    const typeApi = pathname.split('/')[1];
    const results = await fetchApi(searchInput, typeSearch, typeApi);
    if (results.length === 0) return window.alert(alertMessage);
    if (results.length === 1) {
      if (typeApi === 'comidas') {
        history.push(`/comidas/${results[0].idMeal}`);
      } else {
        history.push(`/bebidas/${results[0].idDrink}`);
      }
    } else if (typeApi === 'comidas') dispatch(requestMeals(results));
    else {
      dispatch(requestDrinks(results));
    }
  }

  return (
    <form>
      <div className="input-container">
        <input
          className="input"
          data-testid="search-input"
          value={ searchInput }
          placeholder="Selecione uma opção e digite sua busca"
          type="text"
          onChange={ (e) => setSearchInput(e.target.value) }
        />
      </div>
      <div className="type-search-container">
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredient"
            name="search-radio"
            onChange={ (e) => setTypeSearch(e.target.value) }
            value="ingredient"
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            data-testid="name-search-radio"
            type="radio"
            id="name"
            name="search-radio"
            value="name"
            onChange={ (e) => setTypeSearch(e.target.value) }
          />
          Nome
        </label>
        <label htmlFor="first-letter">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="first-letter"
            name="search-radio"
            value="first-letter"
            onChange={ (e) => setTypeSearch(e.target.value) }
          />
          Primeira letra
        </label>
      </div>
      <button
        className="btn-search"
        data-testid="exec-search-btn"
        type="button"
        onClick={ getSearch }
      >
        Buscar
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default SearchBar;
