import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Copy from 'clipboard-copy';
import Ingredientes from '../components/Ingredientes';
import RecomendedCards from '../components/RecomendedCards';
import MyContext from '../context/MyContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import requestById from '../services/requestById';
import verifyInFavorite from '../services/verifyInFavorite';
import verifyInProgress from '../services/verifyInProgress';
import verifyStorage from '../services/verifyStorage';
import verifyText from '../services/verifyText';
import '../styles/Bebida.css';

function Bebida() {
  const INICIO_CORTE = 9;
  const history = useHistory();
  const id = history.location.pathname
    .substr(INICIO_CORTE, history.location.pathname.length);
  const {
    recipe,
    setRecipe,
    renderButtonComparison,
    setRenderButtonComparison,
    copied,
    setCopied,
    favorite,
    setFavorite,
  } = useContext(MyContext);

  // async function requestRecipe() {
  //   const recipeFromApi = await requestById(id, 'bebidas');
  //   setRecipe(recipeFromApi.drinks[0]);
  // }

  useEffect(() => {
    setRenderButtonComparison(verifyStorage(id, 'doneRecipes'));
  }, [id, renderButtonComparison, setRenderButtonComparison]); // renderButtonComparison

  useEffect(() => {
    setFavorite(verifyStorage(id, 'favoriteRecipes'));
  }, [favorite, id, setFavorite]); // favorite

  function iniciarReceita() {
    verifyInProgress(id, 'cocktails');
    history.push(`/bebidas/${id}/in-progress`);
  }

  function renderButton() {
    const textButton = verifyText(id, 'cocktails');
    return (
      <button
        className="iniciar-receita-btn"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ iniciarReceita }
      >
        { textButton }
      </button>
    );
  }

  function favoriteRecipe(status) {
    verifyInFavorite(recipe, 'Drink', status);
    setFavorite(status);
  }

  useEffect(() => {
    async function requestRecipe() {
      const recipeFromApi = await requestById(id, 'bebidas');
      setRecipe(recipeFromApi.drinks[0]);
    }
    requestRecipe();
  }, [id, setRecipe]); // []

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
      />
      <div className="nomeEbotões">
        <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => {
              Copy(`http://localhost:3000${history.location.pathname}`);
              setCopied(true);
            } }
          >
            {copied && 'Link copiado!'}
            <img src={ shareIcon } alt="shareIcon" />
          </button>
          <button
            type="button"
            onClick={ () => (favorite ? favoriteRecipe(false) : favoriteRecipe(true)) }
          >
            <img
              data-testid="favorite-btn"
              src={ favorite ? whiteHeartIcon : blackHeartIcon }
              alt="favoriteIcon"
            />
          </button>
        </div>
      </div>
      <h4 data-testid="recipe-category">{recipe.strAlcoholic}</h4>
      <Ingredientes />
      <div>
        <h2>Instruções</h2>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      <div className="recomendadas">
        <h2>Recomendadas</h2>
        <RecomendedCards title="comidas" />
      </div>
      {renderButtonComparison && renderButton()}
    </div>
  );
}

export default Bebida;
