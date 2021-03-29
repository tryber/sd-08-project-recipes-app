import React, { useState } from 'react';
import Header from '../components/Header';
import RecipeDoneCard from '../components/RecipeDoneCard';

function RecipesDone() {
  const recipesFromStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [doneRecipes, setDoneRecipes] = useState(recipesFromStorage);
  return (
    <div>
      <Header title="Receitas Feitas" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setDoneRecipes(recipesFromStorage) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setDoneRecipes(recipesFromStorage
            .filter((recipe) => recipe.type === 'comida')) }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setDoneRecipes(recipesFromStorage
            .filter((recipe) => recipe.type === 'bebida')) }
        >
          Drinks
        </button>
      </div>
      <div>
        { doneRecipes.map((recipe, index) => (
          <RecipeDoneCard key={ recipe.id } doneRecipes={ recipe } index={ index } />
        )) }
      </div>
    </div>
  );
}

export default RecipesDone;
