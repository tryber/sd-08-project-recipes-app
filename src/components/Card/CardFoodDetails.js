import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import FoodContext from '../../context/comidaContext/FoodContext';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import '../../index.css';

function copyToClipboard(id, callback) {
  navigator.clipboard.writeText(`http://localhost:3000/comidas/${id}`);
  callback(true);
}

function favorite(isFavorited, callback, item) {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (isFavorited) {
    const newFavorites = favorites
      .filter((foodOrDrink) => foodOrDrink.id !== item.idMeal);
    callback(false);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  } else {
    const newFavorites = [...favorites, {
      id: item.idMeal,
      type: 'comida',
      area: item.strArea,
      category: item.strCategory,
      alcoholicOrNot: '',
      name: item.strMeal,
      image: item.strMealThumb,
    }];
    callback(true);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  }
}

function CardFoodDetails({ alreadyFavorited, idDaReceita }) {
  const {
    values: {
      detailFoods,
    },
  } = useContext(FoodContext);

  const LAST_INGREDIENT = 20;
  const ingredientIndex = [];
  for (let index = 0; index < LAST_INGREDIENT; index += 1) {
    ingredientIndex.push(index);
  }

  const [isCopied, setIsCopied] = useState(false);
  const [favorited, setFavorited] = useState(alreadyFavorited);

  const [redirect, setRedirect] = useState(false);

  const ingredients = [];
  const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const recipeStarted = Object.keys(recipes.meals).some((id) => id === idDaReceita);
  function startRecipe() {
    const newMeals = { ...recipes, meals: { [idDaReceita]: ingredients } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newMeals));
    setRedirect(true);
  }

  const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
  const recipeFinished = recipesDone.some((item) => item.id === idDaReceita);

  if (redirect) return <Redirect to={ `/comidas/${idDaReceita}/in-progress` } />;

  return (
    <section>
      {detailFoods.map((item) => (
        <div key={ item.strMeal } className="imageDetails">
          <img
            src={ item.strMealThumb }
            alt={ item.strMeal }
            data-testid="recipe-photo"
          />
          <h3 data-testid="recipe-title">{item.strMeal}</h3>
          <input
            type="image"
            data-testid="share-btn"
            onClick={ () => { copyToClipboard(idDaReceita, setIsCopied); } }
            src={ shareIcon }
            alt="share"
          />
          {isCopied && <p>Link copiado!</p>}
          <input
            type="image"
            data-testid="favorite-btn"
            onClick={ () => { favorite(favorited, setFavorited, item); } }
            src={ (favorited) ? blackHeartIcon : whiteHeartIcon }
            alt="share"
          />
          <p data-testid="recipe-category">{item.strCategory}</p>
          <ul>
            {ingredientIndex.map((index) => {
              const srt = `${item[`strMeasure${index + 1}`]}`;
              if (srt === 'null' || srt === '' || srt === ' ') return '';
              ingredients.push(`${srt} ${item[`strIngredient${index + 1}`]}`);
              return (
                <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                  {`${srt} ${item[`strIngredient${index + 1}`]}`}
                </li>
              );
            })}
          </ul>
          <p data-testid="instructions">{item.strInstructions}</p>
          <p data-testid="video">{item.strYoutube}</p>
        </div>
      ))}
      {!recipeFinished
      && (
        <button
          type="button"
          onClick={ () => { startRecipe(); } }
          className="page-buttons start-recipe"
          data-testid="start-recipe-btn"
        >
          {(recipeStarted) ? 'Continuar Receita' : 'Iniciar Receita'}
        </button>)}
    </section>
  );
}

CardFoodDetails.propTypes = {
  alreadyFavorited: PropTypes.bool.isRequired,
  idDaReceita: PropTypes.string.isRequired,
};

export default CardFoodDetails;
