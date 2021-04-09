import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import Header from '../components/Header';
import FavoriteRecipeCards from '../components/FavoriteRecipesCards';

function ReceitasFavoritadas() {
  const {
    recipeFavorite,
    setRecipeFavorite,
  } = useContext(MyContext);

  function filterByFood() {
    setRecipeFavorite(recipeFavorite.filter((recipe) => recipe.type === 'comida'));
  }
  function filterByDrinks() {
    setRecipeFavorite(recipeFavorite.filter((recipe) => recipe.type === 'bebida'));
  }

  function removeTheFilters() {
    setRecipeFavorite(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
  }

  return (
    <div>
      <Header title="Receitas Favoritas" explore={ false } />
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
      <FavoriteRecipeCards />
    </div>
  );
}

export default ReceitasFavoritadas;
