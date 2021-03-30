import React, { useContext, useState } from 'react';
import RecipesContext from '../ContextApi/RecipesContext';

export default function SearchBar() {
  const { searchParam, setSearchParam } = useContext(RecipesContext);
  const [inputChange, setInputChange] = useState({
    inputSearch: '',
    selectedParam: '',
  });

  function handleChange({ target: { value, name } }) {
    setInputChange({
      ...inputChange,
      [name]: value,
    });
  }

  function handleClick() {
    setSearchParam(inputChange);
    const msg = 'alert(\'Sua busca deve conter somente 1 (um) caracter\');\'';
    const maxCaracter = 1;
    const paramType = inputChange.selectedParam;
    const inputLength = inputChange.inputSearch.length;
    if (paramType === 'first-letter' && inputLength > maxCaracter) {
      return msg;
    }
    setInputChange({
      ...inputChange,
      inputSearch: '',
    });
  }

  console.log(searchParam);

  return (
    <span>
      <label htmlFor="search">
        <input
          type="text"
          id="search"
          value={ inputChange.inputSearch }
          name="inputSearch"
          data-testid="search-input"
          onChange={ handleChange }
        />
      </label>
      <div>
        <label htmlFor="ingredient">
          <input
            type="radio"
            id="ingredient"
            name="selectedParam"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ handleChange }
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            name="selectedParam"
            value="name"
            data-testid="name-search-radio"
            onChange={ handleChange }
          />
          Nome
        </label>
        <label htmlFor="first-letter">
          <input
            type="radio"
            id="first-letter"
            name="selectedParam"
            value="first-letter"
            data-testid="first-letter-search-radio"
            onChange={ handleChange }
          />
          Primeira letra
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Buscar

        </button>
      </div>
    </span>
  );
}
