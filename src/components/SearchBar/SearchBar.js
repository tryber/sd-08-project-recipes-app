import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './searchBar.css';
import Context from '../../contextApi/Context';
import { filterRecipes } from '../../services/FoodsDrinksRequests';

const SearchBar = ({ title }) => {
  const { setResults } = useContext(Context);
  const history = useHistory();
  const [filter, setFilter] = useState('i');
  const [query, setQuery] = useState('');
  const submitFilters = async () => {
    if (filter === 'f' && query.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
      return;
    }

    const recipes = await filterRecipes(title, filter, query);
    if (recipes && recipes.length === 1) {
      history.push(
        `/${title.toLowerCase()}/${recipes[0][title === 'Comidas' ? 'idMeal' : 'idDrink']}`,
      );
    } else if (recipes === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else {
      setResults(recipes);
    }
  };
  return (
    <div className="container mt-2">
      <div className="search-bar">
        <input
          type="text"
          data-testid="search-input"
          onChange={ (e) => setQuery(e.target.value) }
        />
        <div className="radio-group">
          <label htmlFor="ingredient">
            <input
              id="ingredient"
              name="recipe"
              type="radio"
              data-testid="ingredient-search-radio"
              onChange={ () => setFilter('i') }
            />
            Ingrediente
          </label>
          <label htmlFor="name">
            <input
              id="name"
              name="recipe"
              type="radio"
              data-testid="name-search-radio"
              onChange={ () => setFilter('s') }
            />
            Nome
          </label>
          <label htmlFor="firstLetter">
            <input
              id="firstLetter"
              name="recipe"
              type="radio"
              data-testid="first-letter-search-radio"
              onChange={ () => setFilter('f') }
            />
            Primeira letra
          </label>
        </div>
        <button
          className="btn btn-info"
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => submitFilters() }
        >
          Buscar
        </button>
      </div>
    </div>
  );
};
SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};
export default SearchBar;
