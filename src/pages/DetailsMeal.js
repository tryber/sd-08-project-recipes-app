import React, { useEffect, useContext, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Copy from 'clipboard-copy';
import { DataDrinksContext } from '../context/ContextDrinks';
import { getMealRecipesDetails } from '../services/getAPIs';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { getRecipeById } from '../localStorage/recipeProgressStorage';
import {
  saveRecipeFavorites,
  getRecipeFavoriteById,
} from '../localStorage/recipeFavorite';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './DetailsMeal.css';

function DetailsMeal() {
  const dataDrinks = useContext(DataDrinksContext);
  const { drinks } = dataDrinks;
  const Params = useParams();
  const [mealDetail, setMealDetail] = useState([]);
  const [startRecipeBtnVisible, setStartRecipeBtnVisible] = useState(true);
  const [continueRecipe, setContinueRecipe] = useState(false);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const [copyLink, setCopyLink] = useState(false);

  const isFavorite = useCallback(
    () => getRecipeFavoriteById(Params.id) && setFavoriteRecipe(true),
    [Params.id],
  );

  const isContinue = useCallback(
    () => getRecipeById('meals', Params.id) && setContinueRecipe(true),
    [Params.id],
  );

  useEffect(() => {
    async function fetchDetails() {
      const saveDetail = await getMealRecipesDetails(Params.id);
      setMealDetail(saveDetail);
      JSON.parse(localStorage.doneRecipes).filter(
        (item) => item.id === Params.id && setStartRecipeBtnVisible(false),
      );
      JSON.parse(localStorage.favoriteRecipes).filter(
        (item) => item.id === Params.id && setFavoriteRecipe(true),
      );
    }
    isFavorite();
    isContinue();
    fetchDetails();
  }, [Params.id, isContinue, isFavorite]);

  const sizeOfLength = 2;
  const startOfSlice = 0;
  const endOfSlice = 6;

  const measure = Object.entries(mealDetail).reduce((acc, [key, value]) => {
    if (key.includes('strMeasure') && value) {
      return acc.concat(value);
    }
    return acc;
  }, []);

  const onClickCopyLink = () => {
    setCopyLink(true);
    Copy(`http://localhost:3000/comidas/${Params.id}`);
  };
  return (
    <div>
      <div className="container-card-meal-details">
        <div className="card-meal-details" key={ mealDetail.idMeal }>
          <img
            data-testid="recipe-photo"
            src={ mealDetail.strMealThumb }
            alt="thumbnails-meal"
          />
          <h2 data-testid="recipe-title">{mealDetail.strMeal}</h2>
          <p data-testid="recipe-category">{mealDetail.strCategory}</p>
          <h3>Ingredients</h3>
          <ul>
            {Object.entries(mealDetail).reduce((acc, [key, value], index) => {
              if (key.includes('strIngredient') && value) {
                return acc.concat(
                  <li
                    data-testid={ `${acc.length}-ingredient-name-and-measure` }
                    key={ index }
                  >
                    {value}
                    {' '}
                    -
                    {measure[acc.length]}
                  </li>,
                );
              }
              return acc;
            }, [])}
          </ul>
          <h4>Instructions</h4>
          <p data-testid="instructions">{mealDetail.strInstructions}</p>
          <h4>Video</h4>
          <iframe
            data-testid="video"
            src={ `${mealDetail.strYoutube}`.replace('watch?v=', 'embed/') }
            allow="autoplay; encrypted-media"
            title="video"
          />
          <h4>Recomendadas</h4>
          <div className="carousel-class">
            {drinks.length > sizeOfLength
              && drinks.slice(startOfSlice, endOfSlice).map((drink, index) => (
                <figure className="recomendation-img-food" key={ index }>
                  <img
                    key={ drink.idDrink }
                    data-testid={ `${index}-recomendation-card` }
                    src={ drink.strDrinkThumb }
                    alt="recomendations"
                  />
                  <figcaption>{drink.strCategory}</figcaption>
                  <figcaption data-testid={ `${index}-recomendation-title` }>
                    {drink.strDrink}
                  </figcaption>
                </figure>
              ))}
          </div>
          {!!startRecipeBtnVisible && (
            <Link
              to={ `/comidas/${Params.id}/in-progress` }
              className="start-recipe-btn"
              data-testid="start-recipe-btn"
            >
              {continueRecipe ? 'Continuar Receita' : 'Iniciar Receita'}
            </Link>
          )}
        </div>
      </div>
      <div className="share-favorite-btn">
        <button
          onClick={ () => onClickCopyLink() }
          type="button"
          variant="warning"
        >
          <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
        </button>
        <button
          onClick={ () => {
            saveRecipeFavorites(mealDetail);
            setFavoriteRecipe(!favoriteRecipe);
          } }
          type="button"
          variant="danger"
        >
          <img
            data-testid="favorite-btn"
            src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
            alt="favorite-icon"
          />
        </button>
        {copyLink && <span>Link copiado!</span>}
      </div>
    </div>
  );
}

export default DetailsMeal;
