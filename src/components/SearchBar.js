import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/SearchBar.module.css';

const SearchBar = ({ fetchFunction }) => {
  const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');

  function handleSearchButton() {
    if (searchType === 'firstLetter' && searchValue.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
      setSearchValue('');
      return;
    }
    fetchFunction(searchType, searchValue);
  }

  return (
    <form className={ styles.searchBar }>
      <div className={ styles.row }>
        <input
          className={ styles.textInput }
          type="text"
          placeholder="Buscar Receita"
          value={ searchValue }
          onChange={ ({ target }) => setSearchValue(target.value) }
          data-testid="search-input"
        />
      </div>

      <div className={ styles.row }>
        <label htmlFor="search-by-ingredient" className={ styles.label }>
          <input
            id="search-by-ingredient"
            name="search-type"
            value="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
            onChange={ ({ target }) => setSearchType(target.value) }
          />
          Ingrediente
        </label>

        <label htmlFor="search-by-name" className={ styles.label }>
          <input
            id="search-by-name"
            name="search-type"
            value="name"
            type="radio"
            data-testid="name-search-radio"
            onChange={ ({ target }) => setSearchType(target.value) }
          />
          Nome
        </label>

        <label htmlFor="search-by-first-letter" className={ styles.label }>
          <input
            id="search-by-first-letter"
            name="search-type"
            value="firstLetter"
            type="radio"
            data-testid="first-letter-search-radio"
            onChange={ ({ target }) => setSearchType(target.value) }
          />
          Primeira letra
        </label>
      </div>

      <div className={ styles.row }>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleSearchButton }
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

SearchBar.propTypes = {
  fetchFunction: PropTypes.func.isRequired,
};

export default SearchBar;
