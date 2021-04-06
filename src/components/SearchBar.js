import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function SearchBar() {
  const [optionSelected, setOptionSelected] = useState('');
  const { setSearchParams, inputValue, setInputValue } = useContext(Context);
  return (
    <div className="search-bar">
      <input
        onChange={ (e) => setInputValue(e.target.value) }
        type="text"
        data-testid="search-input"
      />
      <div className="search-bar-radio-btn">
        <label htmlFor="ingrediente">
          <input
            onClick={ () => setOptionSelected('ingrediente') }
            type="radio"
            name="filters"
            id="ingrediente"
            data-testid="ingredient-search-radio"
          />
          Ingrediente
        </label>
        <label htmlFor="nome">
          <input
            onClick={ () => setOptionSelected('nome') }
            type="radio"
            name="filters"
            id="nome"
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label htmlFor="primeira-letra">
          <input
            onClick={ () => setOptionSelected('primeira-letra') }
            type="radio"
            name="filters"
            id="primeira-letra"
            data-testid="first-letter-search-radio"
          />
          Primeira letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => {
          if (optionSelected === 'primeira-letra' && inputValue.length > 1) {
            return alert('Sua busca deve conter somente 1 (um) caracter');
          }
          setSearchParams(optionSelected);
        } }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
