import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import CardCarousel from '../components/CardCarousel';
import api from '../services/index';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

const NUMBER_9 = 9;

function FavoriteMealRecipe(foods) {
  const { idMeal, strArea, strCategory,
    strMeal, strMealThumb } = foods[0];
  const obj = [{
    id: idMeal,
    type: 'comida',
    area: strArea || '',
    category: strCategory || '',
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  }];
  return obj;
}

function handleFavorite(checkFavorite, setCheckFavorite, foods) {
  if (!checkFavorite) {
    setCheckFavorite(true);
    localStorage.setItem(
      'favoriteRecipes', JSON.stringify(FavoriteMealRecipe(foods)),
    );
  } else {
    setCheckFavorite(false);
    localStorage.removeItem('favoriteRecipes');
  }
}

const filterIngredientsAndMeasures = (recipe) => {
  const arrayFromObject = Object.entries(recipe)
    .filter((ingredientIndex) => ingredientIndex[0].startsWith('strMeasure')
                || ingredientIndex[0].startsWith('strIngredient'))
    .filter((ingredientIndex) => ingredientIndex[1] !== '')
    .filter((ingredientIndex) => ingredientIndex[1] !== null);
  const ingredientMeasurePairs = [
    arrayFromObject.slice(0, arrayFromObject.length / 2),
    arrayFromObject.slice(arrayFromObject.length / 2),
  ];
  return (ingredientMeasurePairs[0].map((ingredientsString, indx) => (
    <li key={ indx } data-testid={ `${indx}-ingredient-name-and-measure` }>
      {ingredientsString[1]}
      {' - '}
      {ingredientMeasurePairs[1][indx][1]}
    </li>
  )));
};

const FoodDetails = () => {
  const history = useHistory();
  const [food, setFood] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(false);
  const [copied, setCopy] = useState(false);
  const [checkFavorite, setCheckFavorite] = useState(() => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorite) {
      return true;
    }
    return null;
  });
  const id = history.location.pathname.slice(NUMBER_9);

  useEffect(() => {
    api.fetchMealById(id)
      .then((response) => response.json()).then((result) => setFood(result.meals));
    api.fetchDrinks()
      .then((response) => response.json()).then((result) => setDrinks(result.drinks));
  }, [id]);

  useEffect(() => {
    if (food.length > 0 && drinks.length > 0) {
      return setLoading(false);
    }
    return setLoading(true);
  }, [food, setLoading, drinks]);

  useEffect(() => {
    if (start) {
      return history.push(`/comidas/${food[0].idMeal}/in-progress`);
    }
  }, [start, food, history]);

  const copyToClipBoard = (url) => copy(`http://localhost:3000${url}`)
    .then(() => {
      console.log('Copy OK!');
      setCopy(true);
    });
    // .catch((err) => {
    //   console.log('Copy failed: ', err);
    // });

  const inProgessRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  return (
    <div style={ { padding: 10 } }>
      {loading
        ? (
          <div>Loading</div>
        ) : (
          <div>
            <div>
              <img
                src={ food[0].strMealThumb }
                alt="data"
                data-testid="recipe-photo"
                className="image-details"
              />
            </div>
            <div className="title-details-container">
              <h3 data-testid="recipe-title">{food[0].strMeal}</h3>
              <div className="share-favorite-container">
                <button
                  className="share-favorite-buttons"
                  type="submit"
                  data-testid="share-btn"
                  onClick={ () => copyToClipBoard(history.location.pathname) }
                >
                  <object
                    className="rocksGlass"
                    type="image/svg+xml"
                    data={ shareIcon }
                  >
                    Share
                  </object>
                </button>
                {copied && <p>Link copiado!</p>}
                <button
                  className="share-favorite-buttons"
                  type="submit"
                  data-testid="favorite-btn"
                  src={ checkFavorite ? blackHeartIcon : whiteHeartIcon }
                  onClick={ () => handleFavorite(
                    checkFavorite, setCheckFavorite, food,
                  ) }
                >
                  {checkFavorite
                    ? (
                      <img
                        className="rocksGlass"
                        type="image/svg+xml"
                        src={ blackHeartIcon }
                        alt="blackHeartIcon"
                      />
                    ) : (
                      <img
                        className="rocksGlass"
                        type="image/svg+xml"
                        src={ whiteHeartIcon }
                        alt="whiteHeartIcon"
                      />
                    )}
                </button>
              </div>
            </div>
            <p data-testid="recipe-category">{food[0].strCategory}</p>
            <h5>Ingredients</h5>
            <ul className="instructions-recipes">
              {filterIngredientsAndMeasures(food[0])}
            </ul>
            <h5>Instructions</h5>
            <p
              className="instructions-recipes"
              data-testid="instructions"
            >
              {food[0].strInstructions}
            </p>
            <div>
              <iframe
                src={ food[0].strYouTube }
                frameBorder="0"
                title="data"
                data-testid="video"
              />
            </div>
            <h5>Recomendadas</h5>
            <CardCarousel drinks={ drinks } />
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="btnz2 btn btn-primary start-recipe-btn"
              onClick={ () => setStart(true) }
            >
              {inProgessRecipes
                ? 'Continuar Receita' : 'Iniciar Receita'}
            </button>
          </div>
        )}
    </div>
  );
};

export default FoodDetails;
