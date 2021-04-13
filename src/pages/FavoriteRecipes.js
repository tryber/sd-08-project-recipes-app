import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';

function FavoriteRecipes() {
  const recipesFromStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [favoriteRecipes, setFavoriteRecipes] = useState(recipesFromStorage);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <div
        className="
          widthM800
          widthM360
          mx-auto
          btn-group
          btn-group-lg
          btn-group-toggle
          d-flex
          justify-content-center"
      >
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFavoriteRecipes(recipesFromStorage) }
          className="btn-favorite-recipes btn btn-warning px-1 font-weight-bold"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFavoriteRecipes(recipesFromStorage
            .filter((recipe) => recipe.type === 'comida')) }
          className="btn-favorite-recipes btn btn-warning px-1 font-weight-bold"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFavoriteRecipes(recipesFromStorage
            .filter((recipe) => recipe.type === 'bebida')) }
          className="btn-favorite-recipes btn btn-warning px-1 font-weight-bold"
        >
          Drinks
        </button>
      </div>
      <div className="container d-flex flex-column justify-content-center mt-2">
        { favoriteRecipes.map((recipe, index) => (
          <FavoriteRecipeCard
            key={ recipe.id }
            favoriteRecipes={ recipe }
            index={ index }
            setFavoriteRecipes={ setFavoriteRecipes }
          />
        )) }
      </div>
    </div>
  );
}

export default FavoriteRecipes;
