import React, { useContext } from 'react';
import RecipesContext from '../ContextApi/RecipesContext';
import CategoryButton from './categoriesButton/CategoryButton';
import fetchDrink from '../services/CocktailApi';
import 'bootstrap/dist/css/bootstrap.css';

export default function DrinkCategoryButton() {
  const { DrinkCategories, setCocktails } = useContext(RecipesContext);
  const categories = DrinkCategories.drinks;
  const maxCategories = 5;

  const handleClickAll = () => {
    fetchDrink('search.php?s=').then((response) => setCocktails(response));
  };

  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleClickAll }
        data-toggle="button"
        className="btn btn-secondary"
      >
        All
      </button>
      {
        categories
        && categories.map((drinks, index) => (
          index < maxCategories
          && <CategoryButton
            key={ drinks.strCategory }
            categories={ drinks }
            page="drink"
          />
        ))
      }
    </div>
  );
}
