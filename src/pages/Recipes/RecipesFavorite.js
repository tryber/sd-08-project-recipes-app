import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../../component/Header';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function RecipesFavorite() {
  const storedFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [copied, setCopied] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState(storedFavorite);

  const filterRecipes = (filter) => {
    const filtered = !filter
      ? storedFavorite
      : storedFavorite.filter((recipe) => filter === recipe.type);
    setFavoriteRecipes(filtered);
  };

  const copyLink = (eachRecipe) => {
    copy(`http://localhost:3000/${eachRecipe.type}s/${eachRecipe.id}`);
    setCopied(true);
  };

  const unfavorite = (recipeId) => {
    const newFavorites = favoriteRecipes.filter((recipe) => recipeId !== recipe.id);
    setFavoriteRecipes(newFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  };

  return (
    <>
      <Header pageTitle="Receitas Favoritas" showSearchButton={ false } />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterRecipes('') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterRecipes('comida') }
        >
          Comidas
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('bebida') }
        >
          Bebidas
        </button>
      </div>
      <div>
        {favoriteRecipes.map((eachRecipe, index) => (
          <div key={ eachRecipe.id }>
            <Link to={ `/${eachRecipe.type}s/${eachRecipe.id}` }>
              <img
                style={ { width: '100vw' } }
                src={ eachRecipe.image }
                data-testid={ `${index}-horizontal-image` }
                alt={ eachRecipe.name }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {eachRecipe.type === 'comida'
                ? `${eachRecipe.area} - ${eachRecipe.category}`
                : `${eachRecipe.alcoholicOrNot}`}
            </p>
            <Link
              to={ `/${eachRecipe.type}s/${eachRecipe.id}` }
              data-testid={ `${index}-horizontal-name` }
            >
              {eachRecipe.name}
            </Link>
            <button type="button" onClick={ () => copyLink(eachRecipe) }>
              <img
                src={ shareIcon }
                data-testid={ `${index}-horizontal-share-btn` }
                alt="Share Button"
              />
              {copied && <p>Link copiado!</p>}
            </button>
            <button type="button" onClick={ () => unfavorite(eachRecipe.id) }>
              <img
                src={ blackHeartIcon }
                data-testid={ `${index}-horizontal-favorite-btn` }
                alt="Favorite Button"
              />
              {copied && <p>Link copiado!</p>}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
