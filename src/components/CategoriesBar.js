import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  fetchRandomMeals,
  fetchMealsByCategory,
  fetchMealsCategories,
} from '../actions/meals';

import {
  fetchRandomCocktails,
  fetchCocktailsByCategory,
  fetchCocktailsCategories,
} from '../actions/cocktails';

const ALL = 'all';

const searchByMeals = (name, {
  searchRandomMeals,
  searchMealsByCategory,
}) => {
  if (name === ALL) {
    searchRandomMeals();
  } else {
    searchMealsByCategory(name);
  }
};

const searchByCocktails = (name, {
  searchRandomCocktails,
  searchCocktailsByCategory,
}) => {
  if (name === ALL) {
    searchRandomCocktails();
  } else {
    searchCocktailsByCategory(name);
  }
};

const handleClick = (event, props) => {
  event.preventDefault();
  const { title } = props;
  const { name, className } = event.target;
  if (title === 'Comidas') {
    if (className === 'selected') {
      searchByMeals(ALL, props);
      event.target.className = '';
    } else {
      searchByMeals(name, props);
      event.target.className = 'selected';
    }
  }
  if (title === 'Bebidas') {
    if (className === 'selected') {
      searchByCocktails(ALL, props);
      event.target.className = '';
    } else {
      searchByCocktails(name, props);
      event.target.className = 'selected';
    }
  }
};

function CategoriesBar(props) {
  const {
    title,
    meals,
    cocktails,
    mealsCategories,
    cocktailsCategories,
  } = props;

  const zero = 0;
  const maxLength = 5;
  if (title === 'Comidas' || title === 'Bebidas') {
    return (
      <div
        style={ {
          display: title === 'Comidas' || title === 'Bebidas' ? 'inline' : 'none',
        } }
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
        <div className="category">
          <button
            className="category-item"
            type="button"
            name={ ALL }
            data-testid="All-category-filter"
            onClick={ (event) => handleClick(event, props) }
          >
            All
          </button>
          { title === 'Comidas' && mealsCategories.slice(zero, maxLength)
            .map((categorie, index) => (
              <button
                className="category-item"
                type="button"
                key={ index }
                data-testid={ `${categorie.strCategory}-category-filter` }
                name={ categorie.strCategory }
                onClick={ (event) => handleClick(event, props) }
              >
                { categorie.strCategory }
              </button>
            ))}
          { title === 'Bebidas' && cocktailsCategories.slice(zero, maxLength)
            .map((category, index) => (
              <button
                className="category-item"
                type="button"
                key={ index }
                data-testid={ `${category.strCategory}-category-filter` }
                name={ category.strCategory }
                onClick={ (event) => handleClick(event, props) }
              >
                { category.strCategory }
              </button>
            ))}
        </div>
      </div>
    );
  } return null;
}

const mapStateToProps = ({ meals, cocktails }) => ({
  meals: meals.meals,
  mealsCategories: meals.mealsCategories,
  cocktails: cocktails.cocktails,
  cocktailsCategories: cocktails.cocktailsCategories,
  loadMealsCategories: meals.isFetchingCategories,
  loadCocktailsCategories: cocktails.isFetchingCategories,
});

const mapDispatchToProps = (dispatch) => ({
  searchRandomMeals: () => dispatch(fetchRandomMeals()),
  searchMealsByCategory: (category) => dispatch(fetchMealsByCategory(category)),
  searchRandomCocktails: () => dispatch(fetchRandomCocktails()),
  searchCocktailsByCategory: (category) => dispatch(fetchCocktailsByCategory(category)),
  searchMealsCategories: () => dispatch(fetchMealsCategories()),
  searchCocktailsCategories: () => dispatch(fetchCocktailsCategories()),
});

CategoriesBar.propTypes = {
  title: PropTypes.string.isRequired,
  meals: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cocktails: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  mealsCategories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cocktailsCategories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesBar);
