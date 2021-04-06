import React, { useContext } from 'react';
import RecipesContext from '../ContextApi/RecipesContext';
import CategoryButton from './categoriesButton/CategoryButton';
import fetchFood from '../services/FoodApi';
import 'bootstrap/dist/css/bootstrap.css';

export default function FoodCategoryButton() {
  const { FoodCategories, setRecipes } = useContext(RecipesContext);
  const categories = FoodCategories.meals;
  const maxCategories = 5;

  const handleClickAll = () => {
    fetchFood('search.php?s=').then((response) => setRecipes(response));
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
        && categories.map((meals, index) => (
          index < maxCategories
          && <CategoryButton
            key={ meals.strCategory }
            categories={ meals }
            page="food"
          />
        ))
      }
    </div>
  );
}
