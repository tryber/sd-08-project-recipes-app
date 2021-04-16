import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import Header from '../../component/Header';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import StyledFavorites from '../../styles/RecipesFavorite';

const LINK_COPIED_TIMEOUT = 2000;

export default function RecipesFavorite() {
  const storedFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [copied, setCopied] = useState(storedFavorite.map(() => false));
  const [favoriteRecipes, setFavoriteRecipes] = useState(storedFavorite);
  const history = useHistory();

  const filterRecipes = (filter) => {
    const filtered = !filter
      ? storedFavorite
      : storedFavorite.filter((recipe) => filter === recipe.type);
    setFavoriteRecipes(filtered);
  };

  const copyLink = (eachRecipe, index) => {
    const { type, id } = eachRecipe;
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopied(copied.map((_each, i) => i === index));
    setTimeout(() => setCopied(copied.map(() => false)), LINK_COPIED_TIMEOUT);
  };

  const unfavorite = (recipeId) => {
    const newFavorites = favoriteRecipes.filter((recipe) => recipeId !== recipe.id);
    setFavoriteRecipes(newFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  };

  const goToLink = (type, id) => history.push(`/${type}s/${id}`);

  return (
    <StyledFavorites>
      <Header pageTitle="Receitas Favoritas" showSearchButton={ false } />
      <div className="filter-buttons">
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
      <div className="favorite-recipes-container">
        {favoriteRecipes.map((eachRecipe, index) => (
          <div key={ eachRecipe.id } className="recipe">
            <button
              type="button"
              onClick={ () => goToLink(eachRecipe.type, eachRecipe.id) }
              className="recipe-image-container"
            >
              <img
                src={ eachRecipe.image }
                data-testid={ `${index}-horizontal-image` }
                alt={ eachRecipe.name }
              />
            </button>
            <div className="recipe-data">
              <p data-testid={ `${index}-horizontal-top-text` }>
                {eachRecipe.type === 'comida'
                  ? `${eachRecipe.area} - ${eachRecipe.category}`
                  : `${eachRecipe.alcoholicOrNot}`}
              </p>
              <button
                type="button"
                onClick={ () => goToLink(eachRecipe.type, eachRecipe.id) }
                data-testid={ `${index}-horizontal-name` }
                className="recipe-name"
              >
                {eachRecipe.name}
              </button>
              <button
                type="button"
                onClick={ () => copyLink(eachRecipe, index) }
                className="share-btn"
              >
                <img
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="Share Button"
                />
                {copied[index] && <span>Link copiado!</span>}
              </button>
              <button type="button" onClick={ () => unfavorite(eachRecipe.id) }>
                <img
                  src={ blackHeartIcon }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  alt="Favorite Button"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </StyledFavorites>
  );
}
