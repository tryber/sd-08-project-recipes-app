import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import Context from '../context/Context';

import StyledSearchBar from '../styles/component/SearchBar';

export default function SearchBar() {
  const { setSearchParams } = useContext(Context);
  const history = useHistory();
  const [filters, setFilters] = useState({
    searchInput: '',
    selectedParameter: '',
    location: history.location.pathname,
  });

  const handleChange = ({ target }) => {
    setFilters({
      ...filters,
      [target.name]: target.value,
    });
  };

  const startSearch = (e) => {
    e.preventDefault();
    if (filters.selectedParameter === 'first-letter' && filters.searchInput.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    setSearchParams(filters);
  };

  return (
    <StyledSearchBar>
      <input
        type="text"
        data-testid="search-input"
        name="searchInput"
        className="search-input"
        value={ filters.searchInput }
        onChange={ handleChange }
      />
      <div className="parameters">
        <label htmlFor="ingredient">
          <input
            id="ingredient"
            type="radio"
            name="selectedParameter"
            data-testid="ingredient-search-radio"
            value="ingredient"
            onChange={ handleChange }
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            id="name"
            type="radio"
            name="selectedParameter"
            data-testid="name-search-radio"
            value="name"
            onChange={ handleChange }
          />
          Nome
        </label>
        <label htmlFor="first-letter">
          <input
            id="first-letter"
            type="radio"
            name="selectedParameter"
            data-testid="first-letter-search-radio"
            value="first-letter"
            onChange={ handleChange }
          />
          Primeira letra
        </label>
      </div>
      <button type="submit" data-testid="exec-search-btn" onClick={ startSearch }>
        Buscar
      </button>
    </StyledSearchBar>
  );
}
