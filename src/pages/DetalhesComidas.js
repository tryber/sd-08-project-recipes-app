import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/ContextRecipes';
import BuscaBebidas from '../services/BuscaBebidas';
import BuscaComidas from '../services/BuscaComidas';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import '../App.css';

function DetalhesComidas() {
  // state que guarda o retorno da requisição
  const {
    foodDetail,
    setFoodDetail,
    recomendedDrink,
    setRecomendedDrink,
    recipeState,
    setRecipeState,
    isFavorite,
    setFavorite } = useContext(RecipesContext);

  const maxRecomended = 6;
  const minRecomended = 0;

  function isFavorited() {
    const location = window.location.pathname;
    const size = 9;
    const RecipeID = location.slice(size, location.length);
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getFavoriteRecipes) {
      getFavoriteRecipes.find((recipe) => recipe.id === RecipeID);
      setFavorite(true);
    }
  }

  useEffect(() => {
    // pegar somente o id no final da url
    const location = window.location.pathname;
    const size = 9;
    const RecipeID = location.slice(size, location.length);
    BuscaComidas('foodDetail', setFoodDetail, RecipeID);
    BuscaBebidas('name', setRecomendedDrink, foodDetail.strMeal);
    isFavorited();
  }, []);

  function renderIngredients() {
    const ingredientArray = [];
    const vinte = 20;
    for (let i = 1; i <= vinte; i += 1) {
      if (foodDetail[0][`strIngredient${i}`] === '') {
        break;
      }
      ingredientArray.push({
        ingredientes: foodDetail[0][`strIngredient${i}`],
        medidas: foodDetail[0][`strMeasure${i}`] });
    }

    return ingredientArray.map((ingredient, index) => (
      <p
        key={ index }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {`Ingredient: ${ingredient.ingredientes} Measure: ${ingredient.medidas}`}
      </p>
    ));
  }

  // O card de receitas recomendadas deve possuir o atributo data-testid="${index}-recomendation-card";
  // O botão de iniciar receita deve possuir o atributo data-testid="start-recipe-btn";

  // Essa função gerencia o estado da receita
  function handleRecipeState() {
    setRecipeState({ ...recipeState, ReceitaIniciada: true });
    const location = window.location.pathname;
    const size = 9;
    const RecipeID = location.slice(size, location.length);

    window.location.pathname = `/comidas/${RecipeID}/in-progress`;
  }

  function handleShareButton() {
    const copyText = window.location.href;
    window.navigator.clipboard.writeText(copyText);
  }

  function handleFavoriteButton() {
    const favObj = {
      favoriteRecipes: [{
        id: foodDetail[0].idMeal,
        type: 'comida',
        area: foodDetail[0].strArea,
        category: foodDetail[0].strCategory,
        alcoholicOrNot: '',
        name: foodDetail[0].strMeal,
        image: foodDetail[0].strMealThumb,
      }],
    };

    const currentFavoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    ) || [];

    currentFavoriteRecipes.push(favObj.favoriteRecipes[0]);

    currentFavoriteRecipes.concat(JSON.parse(localStorage.getItem('favoriteRecipes')));

    localStorage.setItem('favoriteRecipes', JSON.stringify(currentFavoriteRecipes));
    isFavorited();
  }

  function handleUnfavoriteButton() {
    const currentFavoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    ) || [];

    const location = window.location.pathname;
    const size = 9;
    const RecipeID = location.slice(size, location.length);

    currentFavoriteRecipes.filter((favoriteRecipe) => (
      favoriteRecipe.id === RecipeID
        ? currentFavoriteRecipes.indexOf(favoriteRecipe) : null
    ));

    setFavorite(false);
  }

  return (
    foodDetail.map((food, index) => (
      <div key={ index }>
        <div>
          <div>
            <p data-testid="recipe-title">{food.strMeal}</p>
            {food.Category !== 'Vegetarian'
              ? <span data-testid="recipe-category">Vegetarian: no</span>
              : <span data-testid="recipe-category">Vegetarian: yes</span>}
          </div>
          <img src={ food.strMealThumb } alt="recipe" data-testid="recipe-photo" />
          <div>
            <p data-testid="instructions">{food.strInstructions}</p>
          </div>
          <div>
            <iframe
              title="youtube-video"
              width="300"
              height="300"
              data-testid="video"
              src={ food.strYoutube }
            />
          </div>

          <div>
            {foodDetail.length === 1 ? renderIngredients() : null}
          </div>

          <div>Recomendadas: </div>

          <div className="carousel scroller">
            <span className="btn prev">&lt;</span>
            <span className="btn next">&gt;</span>
            {recomendedDrink.length >= maxRecomended
              ? recomendedDrink.map((recomendation, index4) => (
                <div key={ index4 }>
                  <span
                    className="carousel-item"
                    data-testid={ `${index4}-recomendation-card` }
                  >
                    <div>
                      <img src={ recomendation.strDrinkThumb } alt="drink" />
                    </div>
                    <div
                      className="card"
                      data-testid={ `${index4}-recomendation-title` }
                    >
                      {recomendation.strDrink}
                    </div>
                  </span>
                </div>
              )).slice(minRecomended, maxRecomended) : null}
          </div>

          <button
            type="button"
            data-testid="start-recipe-btn"
            className="fixed-btn"
            onClick={ handleRecipeState }
          >
            {recipeState.ReceitaIniciada ? 'Continuar Receita' : 'Iniciar Receita'}
          </button>

          <span className="tooltip-text">Link copiado!</span>

          <input
            type="image"
            className="btn-share"
            data-testid="share-btn"
            onClick={ handleShareButton }
            src={ shareIcon }
            alt="share"
          />

          { isFavorite ? <input
            type="image"
            className="btn-favorite-right"
            data-testid="favorite-btn"
            onClick={ handleUnfavoriteButton }
            src={ blackHeartIcon }
            alt="favorite"
          /> : <input
            type="image"
            className="btn-favorite-right"
            data-testid="favorite-btn"
            onClick={ handleFavoriteButton }
            src={ whiteHeartIcon }
            alt="favorite"
          />}

        </div>
      </div>
    ))
  );
}

export default DetalhesComidas;

/* const DetalhesComidas = () => (
  <section className="w-100">
    <h1>
      Página Detalhes Comidas
    </h1>
  </section>
);

export default DetalhesComidas;
 */
