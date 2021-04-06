import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import Copy from 'clipboard-copy';

import DrinkCarousel from '../../components/carousel/DrinkCarousel';
import RecipesContext from '../../ContextApi/RecipesContext';
import ShareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import FoodCard from '../../components/cards/FoodCard';

export default function FoodDetails({ match: { params } }) {
  const { recipeDetails, setSearchParam } = useContext(RecipesContext);
  const [favorite, setFavorite] = useState(false);
  const [recipeById, setRecipeById] = useState({});
  const [copyLink, setCopyLink] = useState(false);
  const { id } = params;

  const storageRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const progressRecipe = storageRecipe && storageRecipe.includes(id);

  useEffect(() => {
    if (storageRecipe === null) {
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, [storageRecipe]);

  const getFavoriteRecipes = useCallback(() => (
    storageRecipe === null ? [] : storageRecipe
      .some((item) => item.id === id && setFavorite(true))), [id, storageRecipe]);

  function setLocalStorage() {
    const recipe = JSON.stringify(id);
    localStorage.setItem('inProgressRecipes', recipe);
  }

  function favoriteRecipe() {
    if (favorite) {
      const filtered = storageRecipe.filter((obj) => obj.id !== id);
      setFavorite(false);
      return localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
    }
    const recipe = [...storageRecipe,
      {
        id: recipeById.idMeal,
        type: 'Comida',
        area: recipeById.strArea,
        category: recipeById.strCategory,
        alcoholicOrNot: '',
        name: recipeById.strMeal,
        image: recipeById.strMealThumb,
      }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipe));
    setFavorite(!favorite);
  }

  useEffect(() => {
    setSearchParam({
      selectedParam: 'food-details',
      id,
    });
  }, [id, setSearchParam]);

  useEffect(() => {
    setRecipeById(recipeDetails);
    getFavoriteRecipes();
  }, [recipeDetails, getFavoriteRecipes]);

  if (!recipeById) return <div>Loading...</div>;

  // Acessando chaves ingredient e measure da receita

  const ingredients = Object.keys(recipeById)
    .filter((item) => item.includes('strIngredient')
    && recipeById[item])
    .map((ingredient) => recipeById[ingredient]);

  const measures = Object.keys(recipeById)
    .filter((item) => item.includes('strMeasure')
    && recipeById[item])
    .map((measure) => recipeById[measure]);

  return (
    <div>
      <div
        data-testid="recipe-photo"
        className="figure-img img-fluid rounded"
        alt="Thumbnail"
      >
        <FoodCard recipes={ recipeById } order="0" />
      </div>
      <h1 data-testid="recipe-title">
        {recipeById.strMeal}
      </h1>
      <input
        type="image"
        data-testid="share-btn"
        onClick={ () => {
          Copy(window.location.href);
          setCopyLink(true);
        } }
        src={ ShareIcon }
        alt="share"
      />
      <input
        type="image"
        data-testid="favorite-btn"
        onClick={ favoriteRecipe }
        src={ (favorite) ? blackHeartIcon : whiteHeartIcon }
        alt="favorite"
      />
      <br />
      {copyLink && <span>Link copiado!</span>}
      <h5 data-testid="recipe-category">
        <b>
          {recipeById.strCategory}
        </b>
      </h5>
      <h2>Ingredientes</h2>
      <ul>
        {
          ingredients
            .map((item, index) => (
              <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                {`${item} - ${measures[index]}`}
              </li>))
        }
      </ul>
      <section>
        <h2>Instruções</h2>
        <p data-testid="instructions">{recipeById.strInstructions}</p>
        {
          recipeById.strYoutube ? <iframe
            frameBorder="0"
            data-testid="video"
            key={ recipeById.strYoutube }
            src={ recipeById.strYoutube.split('watch?v=').join('embed/') }
            title="recipe video"
          />
            : ''
        }
      </section>
      <DrinkCarousel />
      <Link
        style={ { position: 'fixed', bottom: '0px' } }
        data-testid="start-recipe-btn"
        to={ `/comidas/${id}/in-progress` }
        onClick={ setLocalStorage }
      >
        {progressRecipe ? 'Continuar Receita' : 'Iniciar Receita'}
      </Link>
    </div>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
