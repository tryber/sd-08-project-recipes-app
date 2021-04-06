import React, { useEffect, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
import { DataDrinksContext } from '../context/ContextDrinks';
import { getMealRecipesDetails } from '../services/getAPIs';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import './DetailsMeal.css';

function DetailsMeal() {
  const dataDrinks = useContext(DataDrinksContext);
  const { drinks } = dataDrinks;
  const Params = useParams();
  const [mealDetail, setMealDetail] = useState([]);
  useEffect(() => {
    async function fetchDetails() {
      const saveDetail = await getMealRecipesDetails(Params.id);
      setMealDetail(saveDetail);
    }
    fetchDetails();
  }, [Params.id]);

  const sizeOfLength = 2;
  const startOfSlice = 0;
  const endOfSlice = 6;

  const measure = Object.entries(mealDetail).reduce((acc, [key, value]) => {
    if (key.includes('strMeasure') && value) {
      return acc.concat(value);
    }
    return acc;
  }, []);

  return (
    <div>
      <div className="styles.container-card-meal-details">
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
          <Link
            to={ `/comidas/${Params.id}/in-progress` }
            className="start-recipe-btn"
            data-testid="start-recipe-btn"
          >
            Iniciar Receita
          </Link>
        </div>
        <div className="share-favorite-btn">
          <button type="button" variant="warning">
            <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
          </button>
          <button type="button" variant="danger">
            <img
              data-testid="favorite-btn"
              src={ whiteHeartIcon }
              alt="favorite-icon"
            />
          </button>
        </div>
      </div>

    </div>
  );
}

export default DetailsMeal;
