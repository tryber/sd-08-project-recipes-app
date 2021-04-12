import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import CardCarousel from '../components/CardCarousel';
import api from '../services/index';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

const NUMBER_9 = 9;

function FavoriteDrinkRecipe(drink) {
  const { idDrink, strArea, strCategory,
    strDrinkThumb, strDrink, strAlcoholic } = drink[0];
  const obj = [{
    id: idDrink,
    type: 'bebida',
    area: strArea || '',
    category: strCategory || '',
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  }];
  return obj;
}

function handleFavorite(checkFavorite, setCheckFavorite, drink) {
  if (!checkFavorite) {
    setCheckFavorite(true);
    localStorage.setItem(
      'favoriteRecipes', JSON.stringify(FavoriteDrinkRecipe(drink)),
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

const DrinkDetails = () => {
  const history = useHistory();
  const [drink, setDrink] = useState([]);
  const [foods, setFoods] = useState([]);
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

  console.log(id);

  useEffect(() => {
    api.fetchDrinkById(id)
      .then((response) => response.json()).then((result) => setDrink(result.drinks));
    api.fetchMeals()
      .then((response) => response.json()).then((result) => setFoods(result.meals));
  }, [id]);

  useEffect(() => {
    if (drink && drink.length > 0 && foods && foods.length > 0) {
      return setLoading(false);
    }
    return setLoading(true);
  }, [drink, setLoading, foods]);

  useEffect(() => {
    if (start) {
      return history.push(`/bebidas/${drink[0].idDrink}/in-progress`);
    }
  }, [start, drink, history]);

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
          <>Loading</>
        ) : (
          <div>
            <div>
              <img
                src={ drink[0].strDrinkThumb }
                alt="data"
                data-testid="recipe-photo"
                className="image-details"
              />
            </div>
            <div className="title-details-container">
              <h3 data-testid="recipe-title">{drink[0].strDrink}</h3>
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
                    checkFavorite, setCheckFavorite, drink,
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
            <p data-testid="recipe-category">{drink[0].strAlcoholic}</p>
            <h5>Ingredients</h5>
            <ul className="instructions-recipes">
              {filterIngredientsAndMeasures(drink[0])}
            </ul>
            <h5>Instructions</h5>
            <p
              data-testid="instructions"
              className="instructions-recipes"
            >
              {drink[0].strInstructions}
            </p>
            <div>
              <iframe
                src={ drink[0].strYouTube }
                frameBorder="0"
                title="data"
                data-testid="video"
              />
            </div>
            <h5>Recomendadas</h5>
            <CardCarousel foods={ foods } />
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

export default DrinkDetails;
