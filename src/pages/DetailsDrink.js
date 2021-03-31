import React, { useEffect, useContext, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Copy from 'clipboard-copy';
import { getDrinkRecipesDetails, getMealByName } from '../services/getAPIs';
import { LoginAndFoodContext } from '../context/ContextFood';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getRecipeById } from '../localStorage/recipeProgressStorage';
import { saveRecipeFavorites,
  getRecipeFavoriteById } from '../localStorage/recipeFavorite';
import './DetailsDrink.css';

function DetailsDrink() {
  const dataFood = useContext(LoginAndFoodContext);
  const { meals } = dataFood;
  const Params = useParams();
  const [drinkDetail, setDrinkDetail] = useState([]);
  const [continueRecipe, setContinueRecipe] = useState(false);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const [startRecipeBtnVisible, setStartRecipeBtnVisible] = useState(true);
  const [copyLink, setCopyLink] = useState(false);
  const isFavorite = useCallback(
    () => getRecipeFavoriteById(Params.id) && setFavoriteRecipe(true),
    [Params.id],
  );

  const isContinue = useCallback(
    () => getRecipeById('cocktails', Params.id) && setContinueRecipe(true),
    [Params.id],
  );

  useEffect(() => {
    async function fetchDetails() {
      const saveDetail = await getDrinkRecipesDetails(Params.id);
      setDrinkDetail(saveDetail);
      JSON.parse(localStorage.doneRecipes).filter(
        (item) => item.id === Params.id && setStartRecipeBtnVisible(false),
      );
    }
    isContinue();
    isFavorite();
    getMealByName('');
    fetchDetails();
  }, [Params.id, isContinue, isFavorite]);

  const sizeOfLength = 2;
  const startOfSlice = 0;
  const endOfSlice = 6;
  const measure = Object.entries(drinkDetail).reduce((acc, [key, value]) => {
    if (key.includes('strMeasure') && value) {
      return acc.concat(value);
    }
    return acc;
  }, []);

  const onClickCopyLink = () => {
    setCopyLink(true);
    Copy(`http://localhost:3000/bebidas/${Params.id}`);
  };

  return (
    <div>
      <div className="container-card-drink-details">
        <div className="card-drink-details" key={ drinkDetail.idDrink }>
          <img
            data-testid="recipe-photo"
            src={ drinkDetail.strDrinkThumb }
            alt="thumbnails-drink"
          />
          <h2 data-testid="recipe-title">{drinkDetail.strDrink}</h2>
          <p data-testid="recipe-category">
            {drinkDetail.strCategory}
            {' '}
            -
            {drinkDetail.strAlcoholic}
          </p>
          <h3>Ingredients</h3>
          <ul>
            {Object.entries(drinkDetail).reduce((acc, [key, value], index) => {
              if (key.includes('strIngredient') && value) {
                return acc.concat(
                  <li
                    data-testid={ `${acc.length}-ingredient-name-and-measure` }
                    key={ index }
                  >
                    {measure[acc.length]}
                    {value}
                    {' '}
                    -
                  </li>,
                );
              }
              return acc;
            }, [])}
          </ul>
          <h4>Instructions</h4>
          <p data-testid="instructions">{drinkDetail.strInstructions}</p>
          <h4>Recomendadas</h4>
          <div>
            <div className="carousel-class-drinks">
              {meals.length > sizeOfLength
                && meals.slice(startOfSlice, endOfSlice).map((meal, index) => (
                  <figure className="recomendation-img" key={ index }>
                    <img
                      className="img-cards"
                      key={ meal.idMeal }
                      data-testid={ `${index}-recomendation-card` }
                      src={ meal.strMealThumb }
                      alt="recomendations"
                    />
                    <figcaption>{meal.strCategory}</figcaption>
                    <figcaption data-testid={ `${index}-recomendation-title` }>
                      {meal.strMeal}
                    </figcaption>
                  </figure>
                ))}
            </div>
          </div>
          {!!startRecipeBtnVisible && (
            <Link
              to={ `/bebidas/${Params.id}/in-progress` }
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
            saveRecipeFavorites(drinkDetail);
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

export default DetailsDrink;
