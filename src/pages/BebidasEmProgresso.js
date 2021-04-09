import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Copy from 'clipboard-copy';
import IngredientesEmProcesso from '../components/IngredientesEmProcesso';
import MyContext from '../context/MyContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import requestById from '../services/requestById';
import verifyDone from '../services/verifyDone';
import verifyInFavorite from '../services/verifyInFavorite';
import verifyStorage from '../services/verifyStorage';
import '../styles/Bebida.css';

function BebidasEmProgresso() {
  const history = useHistory();
  const id = history.location.pathname.split('/')[2];
  const {
    recipe,
    setRecipe,
    renderButtonComparison,
    setRenderButtonComparison,
    copied,
    setCopied,
    favorite,
    setFavorite,
    countCheck,
    verifyChecked,
    setVerifyChecked,
  } = useContext(MyContext);

  useEffect(() => {
    setRenderButtonComparison(verifyStorage(id, 'doneRecipes'));
  }, [id, renderButtonComparison, setRenderButtonComparison]); // renderButtonComparison

  useEffect(() => {
    setFavorite(verifyStorage(id, 'favoriteRecipes'));
  }, [favorite, id, setFavorite]); // favorite

  useEffect(() => {
    const tamanhoArray = document.getElementsByTagName('input').length;
    console.log(typeof countCheck);
    console.log(typeof tamanhoArray);
    if (countCheck > 0 && countCheck === tamanhoArray) {
      console.log('entrou no if');
      setVerifyChecked(false);
    } else {
      setVerifyChecked(true);
      console.log('entrou no else');
    }
    console.log(verifyChecked);
  }, [countCheck, setVerifyChecked, verifyChecked]); // countCheck

  function finalizaReceita() {
    verifyDone('Drink', recipe);
    history.push('/receitas-feitas');
  }

  function renderButton() {
    return (
      <button
        className="finish-recipe-btn"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ verifyChecked }
        onClick={ finalizaReceita }
      >
        Finalizar Receita
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
              Copy(`http://localhost:3000/bebidas/${id}`);
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
      <IngredientesEmProcesso id={ id } type="cocktails" />
      <div className="instruções">
        <h2>Instruções</h2>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      {renderButton()}
    </div>
  );
}

export default BebidasEmProgresso;
