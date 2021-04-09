import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  fetchMealsByFirstLetter,
  fetchMealsByIngredient,
  fetchMealsByName,
} from '../actions/meals';

import {
  fetchCocktailsByFirstLetter,
  fetchCocktailsByIngredient,
  fetchCocktailsByName,
} from '../actions/cocktails';

const INGREDIENT = 'ingredient';
const NAME = 'name';
const FIRSTLETTER = 'first-letter';

const searchByMeals = (options, word, {
  searchMealsByIngredient,
  searchMealsByName,
  searchMealsByFirstLetter,
}) => {
  if (options === INGREDIENT) {
    searchMealsByIngredient(word);
  } else if (options === NAME) {
    searchMealsByName(word);
  } else if (options === FIRSTLETTER) {
    if (word.length === 1) {
      searchMealsByFirstLetter(word);
    } else {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }
};

const searchByCocktails = (options, word, {
  searchCocktailByIngredient,
  searchCocktailByName,
  searchCocktailByFirstLetter,
}) => {
  if (options === INGREDIENT) {
    searchCocktailByIngredient(word);
  } else if (options === NAME) {
    searchCocktailByName(word);
  } else if (options === FIRSTLETTER) {
    if (word.length === 1) {
      searchCocktailByFirstLetter(word);
    } else {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }
};

const verifyIfExistIngredientSetted = (props) => {
  const {
    title,
    ingredientMealCur,
    ingredientCocktailCur,
  } = props;
  if (title === 'Comidas' && ingredientMealCur !== '') {
    searchByMeals(INGREDIENT, ingredientMealCur, props);
  }
  if (title === 'Bebidas' && ingredientCocktailCur !== '') {
    searchByCocktails(INGREDIENT, ingredientCocktailCur, props);
  }
};

function SearchBar(props) {
  const {
    toggle,
    title,
    meals,
    cocktails,
  } = props;

  const [word, setWord] = useState('');
  const [options, setOptions] = useState('');

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (title === 'Comidas') {
      searchByMeals(options, word, props);
    }
    if (title === 'Bebidas') {
      searchByCocktails(options, word, props);
    }
  };

  verifyIfExistIngredientSetted(props);

  useEffect(() => {
    const zero = 0;
    if (title === 'Comidas' && meals.length === zero) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (title === 'Bebidas' && cocktails.length === zero) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [meals, cocktails, title]);

  return (
    <div
      className="search-container container  white70 flex-column widthM800"
      style={ { display: toggle ? 'flex' : 'none' } }
    >
      {meals.length === 1 && (meals[0].idMeal !== '52968') && (
        <Redirect
          to={ { pathname: `/comidas/${meals[0].idMeal}` } }
        />
      )}
      {cocktails.length === 1 && (
        <Redirect
          to={ { pathname: `/bebidas/${cocktails[0].idDrink}` } }
        />
      )}
      <div className="input-group mb-3">
        <label htmlFor="busca">
          <input
            className="input-search form-control"
            id="busca"
            name="word"
            value={ word }
            data-testid={ `${toggle ? 'search-input' : ''}` }
            onChange={ (event) => setWord(event.target.value) }
          />
        </label>
        <div className="input-group-append">
          <button
            className="button-search btn btn-danger btn-sm py-0"
            type="button"
            data-testid="exec-search-btn"
            onClick={ handlerSubmit }
          >
            Buscar
          </button>
        </div>
      </div>
      <div className="form-check form-check-inline d-flex justify-content-around">
        <label htmlFor="ingredient" className="label-search form-check-label">
          <input
            id="ingredient"
            value={ INGREDIENT }
            type="radio"
            name="options"
            onChange={ (event) => setOptions(event.target.value) }
            data-testid="ingredient-search-radio"
            className="form-check-input"
          />
          Ingrediente
        </label>
        <label htmlFor="name" className="label-search form-check-label">
          <input
            id="name"
            value={ NAME }
            type="radio"
            name="options"
            onChange={ (event) => setOptions(event.target.value) }
            data-testid="name-search-radio"
            className="form-check-input"
          />
          Nome
        </label>
        <label htmlFor="first-letter" className="label-search form-check-label">
          <input
            id="first-letter"
            value={ FIRSTLETTER }
            type="radio"
            name="options"
            onChange={ (event) => setOptions(event.target.value) }
            data-testid="first-letter-search-radio"
            className="form-check-input"
          />
          Primeira letra
        </label>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  toggle: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  meals: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cocktails: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = ({ searchToggleReducer, meals, cocktails }) => ({
  toggle: searchToggleReducer,
  meals: meals.meals,
  cocktails: cocktails.cocktails,
  ingredientMealCur: meals.ingredientCurrency,
  ingredientCocktailCur: cocktails.ingredientCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  searchMealsByIngredient: (ingredient) => dispatch(fetchMealsByIngredient(ingredient)),
  searchMealsByName: (name) => dispatch(fetchMealsByName(name)),
  searchMealsByFirstLetter: (letter) => dispatch(fetchMealsByFirstLetter(letter)),
  searchCocktailByIngredient: (i) => dispatch(fetchCocktailsByIngredient(i)),
  searchCocktailByName: (name) => dispatch(fetchCocktailsByName(name)),
  searchCocktailByFirstLetter: (letter) => dispatch(fetchCocktailsByFirstLetter(letter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
