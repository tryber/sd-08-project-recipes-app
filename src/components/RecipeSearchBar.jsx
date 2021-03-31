import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import searchAction from '../redux/actions/searchAction';
import clearSearchAction from '../redux/actions/clearSearchAction';

export default function RecipeSearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState('');

  const dispatch = useDispatch();

  const handleClick = () => {
    const search = { inputValue, inputType };
    if (inputType === 'first-letter' && inputValue.length !== 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
      setInputValue('');
      dispatch(clearSearchAction());
    } else {
      dispatch(searchAction(search));
    }
  };

  return (
    <form action="">
      <label htmlFor="search-input">
        <input
          placeholder="Buscar receita"
          type="text"
          data-testid="search-input"
          id="search-input"
          value={ inputValue }
          onChange={ ({ target }) => setInputValue(target.value) }
        />
      </label>
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingredient"
          value="ingredient"
          name="inputType"
          checked={ inputType === 'ingredient' }
          onChange={ ({ target }) => setInputType(target.value) }
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          type="radio"
          id="name"
          value="name"
          name="inputType"
          checked={ inputType === 'name' }
          onChange={ ({ target }) => setInputType(target.value) }
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          id="first-letter"
          value="first-letter"
          name="inputType"
          checked={ inputType === 'first-letter' }
          onChange={ ({ target }) => setInputType(target.value) }
        />
        Primeira Letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Pesquisar
      </button>
    </form>
  );
}
