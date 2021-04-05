import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './Search.css';
import { FoodCtx } from '../../context/ContextFood';
import { DrinkCtx } from '../../context/ContextDrink';

function Search(props) {
  const { setFilterFood } = useContext(FoodCtx);
  const { setFilterDrink } = useContext(DrinkCtx);
  const [radio, setRadio] = useState('');
  const [input, setInput] = useState('');

  const handleChangeInput = ({ target }) => {
    setInput(target.value);
  };

  const handleChangeRadio = ({ target }) => {
    setRadio(target.value);
  };

  const handleSubmit = (e) => {
    const { currentPage } = props;
    e.preventDefault();
    if (currentPage === 'Foods') {
      setFilterFood({ key: radio, value: input });
    } else {
      setFilterDrink({ key: radio, value: input });
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={ handleSubmit }>
        <input
          onChange={ handleChangeInput }
          type="text"
          value={ input }
          className="input-search"
          data-testid="search-input"
        />
        <section className="radio">
          <label htmlFor="ing">
            Ingredientes:
            <input
              data-testid="ingredient-search-radio"
              type="radio"
              value="ing"
              onChange={ handleChangeRadio }
              name="filter"
              id="ing"
            />
          </label>
          <label htmlFor="name">
            Nome:
            <input
              data-testid="name-search-radio"
              type="radio"
              value="name"
              onChange={ handleChangeRadio }
              name="filter"
              id="name"
            />
          </label>
          <label htmlFor="first">
            Primeira Letra:
            <input
              data-testid="first-letter-search-radio"
              type="radio"
              value="first"
              onChange={ handleChangeRadio }
              id="first"
              name="filter"
            />
          </label>
        </section>
        <button data-testid="exec-search-btn" type="submit">Buscar</button>
      </form>
    </div>
  );
}

Search.propTypes = {
  currentPage: PropTypes.string.isRequired,
};

export default Search;
