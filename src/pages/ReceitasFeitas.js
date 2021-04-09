import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import Header from '../components/Header';
import RecipeCardsDone from '../components/RecipeCardsDone';

function ReceitasFeitas() {
  const {
    done,
    setDone,
  } = useContext(MyContext);

  function filterByFood() {
    setDone(done.filter((recipe) => recipe.type === 'comida'));
  }
  function filterByDrinks() {
    setDone(done.filter((recipe) => recipe.type === 'bebida'));
  }

  function removeTheFilters() {
    setDone(JSON.parse(localStorage.getItem('doneRecipes')) || []);
  }

  return (
    <div>
      <Header title="Receitas Feitas" explore={ false } />
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ removeTheFilters }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ filterByFood }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ filterByDrinks }
      >
        Drinks
      </button>
      <RecipeCardsDone />
    </div>
  );
}

export default ReceitasFeitas;
