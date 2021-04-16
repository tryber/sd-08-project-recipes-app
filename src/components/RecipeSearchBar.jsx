import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import searchAction from '../redux/actions/searchAction';

export default function RecipeSearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState('');

  const dispatch = useDispatch();

  const handleClick = () => {
    if (inputType === 'first-letter' && inputValue.length !== 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
      setInputValue('');
    } else {
      dispatch(searchAction({ inputValue, inputType }));
    }
  };

  return (
    <form action="" className="form-search-container">
      <label htmlFor="search-input" className="label-search-input">
        <input
          placeholder="Buscar receita"
          type="text"
          data-testid="search-input"
          id="search-input"
          value={ inputValue }
          onChange={ ({ target }) => setInputValue(target.value) }
          className="input-tag"
        />
      </label>
      <div className="form-search-radio">
        <label htmlFor="ingredient" className="label-radio">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredient"
            value="ingredient"
            name="inputType"
            checked={ inputType === 'ingredient' }
            onChange={ ({ target }) => setInputType(target.value) }
            className="radio-tag"
          />
          Ingrediente
        </label>
        <label htmlFor="name" className="label-radio">
          <input
            data-testid="name-search-radio"
            type="radio"
            id="name"
            value="name"
            name="inputType"
            checked={ inputType === 'name' }
            onChange={ ({ target }) => setInputType(target.value) }
            className="radio-tag"
          />
          Nome
        </label>
        <label htmlFor="first-letter" className="label-radio">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="first-letter"
            value="first-letter"
            name="inputType"
            checked={ inputType === 'first-letter' }
            onChange={ ({ target }) => setInputType(target.value) }
            className="radio-tag"
          />
          Primeira Letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
        className="regular-button"
      >
        Pesquisar
      </button>
    </form>
  );
}
