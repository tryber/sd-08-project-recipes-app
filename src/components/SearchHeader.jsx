import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { actionFilteredFoods, actionFilteredDrinks } from '../redux/actions';
import {
  requestsForSearchHeaderFoods,
  requestsForSearchHeaderDrinks,
} from '../helpers/requestsForSearchHeader';

function SearchHeader({ page }) {
  const [searchText, setSearchText] = useState('');
  const [filterRadio, setFilterRadio] = useState('');
  const dispatch = useDispatch();

  const handleChangeInput = ({ target: { value } }) => {
    setSearchText(value);
  };

  const handleChangeRadio = ({ currentTarget: { value } }) => {
    setFilterRadio(value);
  };

  const onClick = async () => {
    if (page === 'Comidas') {
      const foods = await requestsForSearchHeaderFoods(searchText, filterRadio);
      if (foods) {
        dispatch(actionFilteredFoods(foods));
      } else {
        alert(
          'Sinto muito, não encontramos nenhuma receita para esses filtros.',
        );
      }
    } else if (page === 'Bebidas') {
      const drinks = await requestsForSearchHeaderDrinks(
        searchText,
        filterRadio,
      );
      console.log(drinks);
      if (drinks) {
        dispatch(actionFilteredDrinks(drinks));
      } else {
        alert(
          'Sinto muito, não encontramos nenhuma receita para esses filtros.',
        );
      }
    } else {
      console.log('DEFINA UMA PÁGINA');
    }
  };

  return (
    <section className="search-header-form">
      <input
        type="text"
        placeholder="Buscar Receita"
        data-testid="search-input"
        onChange={ handleChangeInput }
      />
      <section>
        <label htmlFor="ingredient">
          <input
            type="radio"
            name="search"
            data-testid="ingredient-search-radio"
            value="ingredient"
            onChange={ handleChangeRadio }
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            name="search"
            data-testid="name-search-radio"
            value="name"
            onChange={ handleChangeRadio }
          />
          Nome
        </label>
        <label htmlFor="first-letter">
          <input
            type="radio"
            name="search"
            data-testid="first-letter-search-radio"
            value="first-letter"
            onChange={ handleChangeRadio }
          />
          Primeira letra
        </label>
      </section>
      <button type="button" data-testid="exec-search-btn" onClick={ onClick }>
        Buscar
      </button>
    </section>
  );
}

SearchHeader.propTypes = {
  page: PropTypes.string.isRequired,
};

export default SearchHeader;
