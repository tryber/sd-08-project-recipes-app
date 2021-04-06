import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../../ContextApi/RecipesContext';
import fetchFood from '../../services/FoodApi';
import fetchDrink from '../../services/CocktailApi';
import 'bootstrap/dist/css/bootstrap.css';

export default function CategoryButton({ categories, page }) {
  const { setRecipes, setCocktails } = useContext(RecipesContext);
  const { strCategory } = categories;

  const [prevCategory, setCategory] = useState('');

  const handleClick = ({ target: { value } }) => {
    if (prevCategory === value && page === 'food') {
      fetchFood('search.php?s=').then((response) => setRecipes(response));
      setCategory('');
    }
    if (prevCategory === value && page === 'drink') {
      fetchDrink('search.php?s=').then((response) => setCocktails(response));
      setCategory('');
    }
    if (prevCategory !== value && page === 'food') {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`)
        .then((data) => data.json())
        .then((response) => setRecipes(response));
      setCategory(value);
    }
    if (prevCategory !== value && page === 'drink') {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${strCategory}`)
        .then((data) => data.json())
        .then((response) => setCocktails(response));
      setCategory(value);
    }
  };

  return (
    <button
      type="button"
      data-testid={ `${strCategory}-category-filter` }
      onClick={ handleClick }
      data-toggle="button"
      className="btn btn-secondary"
      value={ strCategory }
    >
      { strCategory }
    </button>
  );
}

CategoryButton.propTypes = {
  categories: PropTypes.shape({
    strCategory: PropTypes.string.isRequired,
  }).isRequired,
  page: PropTypes.string.isRequired,
};
