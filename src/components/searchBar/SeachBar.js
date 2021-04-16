import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../images/searchIcon.svg';
import LariContext from '../../context/Context';

const SearchBar = (props) => {
  const { showInput, typeAPI, setHidden } = props;
  const [filter, setFilter] = useState('ingredients');
  const [search, setSearch] = useState('');
  const { handleHeaderSearch } = useContext(LariContext);

  return (
    <>
      <div className="input-and-searchBtn">
        <button
          className="searchBtnInput"
          type="button"
          onClick={ () => setHidden(!showInput) }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search icon"
          />
        </button>
        <div className="input">
          { showInput && (<input
            data-testid="search-input"
            onChange={ ({ target }) => setSearch(target.value) }
          />)}
        </div>
      </div>
      <div className="radioBtns">
        <label htmlFor="ingredients">
          <input
            name="radios"
            id="ingredients"
            type="radio"
            data-testid="ingredient-search-radio"
            onChange={ () => setFilter('ingredients') }
          />
          Ingrediente
        </label>
        <label htmlFor="name-search">
          <input
            name="radios"
            id="name-search"
            type="radio"
            data-testid="name-search-radio"
            onChange={ () => setFilter('name') }
          />
          Nome
        </label>
        <label htmlFor="first-letter">
          <input
            name="radios"
            id="first-letter"
            type="radio"
            data-testid="first-letter-search-radio"
            onChange={ () => setFilter('firstLetter') }
          />
          Primeira letra
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => handleHeaderSearch(search, filter, typeAPI) }
        >
          Buscar
        </button>
      </div>
    </>
  );
};

SearchBar.propTypes = {
  showInput: PropTypes.bool.isRequired,
  setHidden: PropTypes.func.isRequired,
  typeAPI: PropTypes.string.isRequired,
};
export default SearchBar;
