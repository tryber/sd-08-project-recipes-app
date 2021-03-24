import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { filterIngredientsAndMeasures, initLocalStorage, setLocalStorage,
  handleFavorite } from '../core/index';
import CardCarousel from '../components/CardCarousel';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import api from '../services/index';

const copy = require('clipboard-copy');

const FoodDetails = () => {
  const history = useHistory();
  const [food, setFood] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(false);
  const [copied, setCopy] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    api.fetchMealById('52771')
      .then((response) => response.json()).then((result) => setFood(result.meals));
    api.fetchDrinks()
      .then((response) => response.json()).then((result) => setDrinks(result.drinks));
    console.log(initLocalStorage());
    const { isFavorite } = initLocalStorage();
    if (isFavorite.length > 0) {
      setFavorite(true);
    }
  }, []);

  useEffect(() => {
    if (food.length > 0 && drinks.length > 0) {
      return setLoading(false);
    }
    return setLoading(true);
  }, [food, setLoading, drinks]);

  useEffect(() => {
    if (start) {
      setLocalStorage(food[0]);
      return history.push(`/comidas/${food[0].idMeal}/in-progress`);
    }
  }, [start, food, history]);

  useEffect(() => {
    handleFavorite(food, favorite);
  }, [favorite, food]);

  const copyToClipBoard = (url) => copy(`http://localhost:3000${url}`)
    .then(() => {
      console.log('Copy OK!');
      setCopy(true);
    });

  const inProgessRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  return (
    <div>
      {loading
        ? (
          <div>Loading</div>
        ) : (
          <div>
            <div>
              <img src={ food[0].strMealThumb } alt="data" data-testid="recipe-photo" />
            </div>
            <div>
              <h3 data-testid="recipe-title">{food[0].strMeal}</h3>
              <button
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
                type="submit"
                data-testid="favorite-btn"
                src={ favorite ? blackHeartIcon : whiteHeartIcon }
                onClick={ () => setFavorite(!favorite) }
              >
                {favorite
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
            <p data-testid="recipe-category">{food[0].strCategory}</p>
            <h5>Ingredients</h5>
            <ul>
              {filterIngredientsAndMeasures(food[0])}
            </ul>
            <h5>Instructions</h5>
            <p data-testid="instructions">{food[0].strInstructions}</p>
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
              className="start-recipe-btn"
              onClick={ () => setStart(true) }
            >
              {inProgessRecipes.meals !== {} ? 'Continuar Receita' : 'Iniciar Receita'}
              {/* Req 39 e 40 passam mas precisamos melhorar isso depois. */}
            </button>
          </div>
        )}
    </div>
  );
};

export default FoodDetails;
