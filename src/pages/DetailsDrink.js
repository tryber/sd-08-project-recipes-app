import React, { useEffect, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
import { getDrinkRecipesDetails, getMealByName } from '../services/getAPIs';
import { LoginAndFoodContext } from '../context/ContextFood';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './DetailsDrink.css';

function DetailsDrink() {
  const dataFood = useContext(LoginAndFoodContext);
  const { meals } = dataFood;
  const Params = useParams();
  const [drinkDetail, setDrinkDetail] = useState([]);
  useEffect(() => {
    async function fetchDetails() {
      const saveDetail = await getDrinkRecipesDetails(Params.id);
      setDrinkDetail(saveDetail);
    }
    getMealByName('');
    fetchDetails();
  }, [Params.id]);

  const sizeOfLength = 2;
  const startOfSlice = 0;
  const endOfSlice = 6;
  const measure = Object.entries(drinkDetail).reduce((acc, [key, value]) => {
    if (key.includes('strMeasure') && value) {
      return acc.concat(value);
    }
    return acc;
  }, []);

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
          <Link
            to={ `/bebidas/${Params.id}/in-progress` }
            className="start-recipe-btn"
            data-testid="start-recipe-btn"
          >
            Iniciar Receita
          </Link>
        </div>
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
  );
}

export default DetailsDrink;
