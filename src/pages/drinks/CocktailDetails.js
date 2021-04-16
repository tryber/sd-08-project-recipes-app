import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Copy from 'clipboard-copy';

import FoodCarousel from '../../components/carousel/FoodCarousel';
import RecipesContext from '../../ContextApi/RecipesContext';
import ShareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import CocktailCard from '../../components/cards/CocktailCard';
import setLocalStorage, { initFavoriteRecipes } from '../../services/LocalStorage';

export default function CocktailDetails({ match: { params } }) {
  const { recipeDetails, setSearchParam } = useContext(RecipesContext);
  const [favorite, setFavorite] = useState(false);
  const [recipeById, setRecipeById] = useState();
  const [copyLink, setCopyLink] = useState(false);
  const { id } = params;

  const storageRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
  // const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const progressRecipe = storageRecipe && storageRecipe.includes(id);

  useEffect(() => {
    initFavoriteRecipes();
  });

  const getFavoriteRecipes = useCallback(() => (
    storageRecipe === null ? [] : storageRecipe
      .some((item) => item.id === id && setFavorite(true))), [id, storageRecipe]);

  function favoriteRecipe() {
    if (favorite) {
      const filtered = storageRecipe.filter((obj) => obj.id !== id);
      setFavorite(false);
      return localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
    }
    const recipe = [...storageRecipe,
      {
        id: recipeById.idDrink,
        type: 'Bebida',
        area: recipeById.strArea,
        category: recipeById.strCategory,
        alcoholicOrNot: recipeById.strAlcoholic || '',
        name: recipeById.strDrink,
        image: recipeById.strMealThumb,
      }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipe));
    setFavorite(!favorite);
  }

  useEffect(() => {
    setSearchParam({
      selectedParam: 'drink-details',
      id,
    });
  }, [id, setSearchParam]);

  useEffect(() => {
    setRecipeById(recipeDetails);
    getFavoriteRecipes();
  }, [recipeDetails, getFavoriteRecipes]);

  if (!recipeById) return <div>Loading...</div>;

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
      <img
        data-testid="recipe-photo"
        alt=""
      />
      <CocktailCard recipes={ recipeById } order={ 0 } />
      <h1 data-testid="recipe-title">
        {recipeById.strDrink}
      </h1>
      <input
        type="image"
        data-testid="share-btn"
        // onClick={ handleCopyLink }
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
      <h6 data-testid="recipe-category">
        <b>
          {recipeById.strCategory}
        </b>
        <span data-testid="recipe-category">
          {recipeById.strAlcoholic}
        </span>
      </h6>
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
        {console.log(recipeById)}
      </section>
      <FoodCarousel />
      <Link
        data-testid="start-recipe-btn"
        to={ `/bebidas/${id}/in-progress` }
        style={ { position: 'fixed', bottom: '0px' } }
        onClick={ () => setLocalStorage(id) }
      >
        {progressRecipe ? 'Continuar Receita' : 'Iniciar Receita'}
      </Link>
    </div>
  );
}

CocktailDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
