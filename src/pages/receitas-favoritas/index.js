import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import Header from '../../components/Header';

function ReceitasFavoritas() {
  const favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favoriteRecipes, setFavoriteRecipes] = useState(favoriteRecipesStorage);
  const [copied, setCopied] = useState(false);

  const filterRecipes = (filter) => {
    const filtered = !filter
      ? favoriteRecipesStorage
      : favoriteRecipesStorage.filter((recipe) => filter === recipe.type);
    setFavoriteRecipes(filtered);
  };

  const copyL = (allRecipe) => {
    copy(`http://localhost:3000/${allRecipe.type}s/${allRecipe.id}`);
    setCopied(true);
  };

  const notFavorite = (id) => {
    const newFavRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    const newFavRecipesString = JSON.stringify(newFavRecipes);
    localStorage.setItem('favoriteRecipes', newFavRecipesString);
    setFavoriteRecipes(newFavRecipes);
  };

  return (
    <>
      <Header explore="false">Receitas Favoritas</Header>
      <section>
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
      </section>
      <section>
        {favoriteRecipes && favoriteRecipes.map((recipe, index) => (
          <section key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                style={ { width: '100vw' } }
                src={ recipe.image }
                data-testid={ `${index}-horizontal-image` }
                alt={ recipe.name }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'comida'
                ? `${recipe.area} - ${recipe.category}`
                : `${recipe.alcoholicOrNot}`}
            </p>
            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
              data-testid={ `${index}-horizontal-name` }
            >
              { recipe.name }
            </Link>
            <button
              type="button"
              onClick={ () => copyL(recipe) }
            >
              <img
                src={ shareIcon }
                data-testid={ `${index}-horizontal-share-btn` }
                alt="Share Button"
              />
              {copied && <p>Link copiado!</p>}
            </button>
            <button
              type="button"
              onClick={ () => notFavorite(recipe.id) }
            >
              <img
                src={ blackHeartIcon }
                data-testid={ `${index}-horizontal-favorite-btn` }
                alt="Not Favorite Button"
              />
            </button>
          </section>
        ))}
      </section>
    </>
  );
}

export default ReceitasFavoritas;
