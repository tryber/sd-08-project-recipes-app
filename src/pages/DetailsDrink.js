import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDrinksDetails, getMealByName } from '../services/getAPIs';
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
      const saveDetail = await getDrinksDetails(Params.id);
      console.log(saveDetail);
      setDrinkDetail(saveDetail);
    }
    getMealByName('');
    fetchDetails();
  }, []);

  const sizeOfLength = 3;
  const startOfSlice = 0;
  const endOfSlice = 2;
  const measure = Object.entries(drinkDetail).reduce(
    (acc, [key, value], index) => {
      if (key.includes('strMeasure') && value) {
        return acc.concat(value);
      }
      return acc;
    },
    [],
  );

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
          <h4>Video</h4>
          <video data-testid="video" src={ drinkDetail.strYoutube }>
            <track
              default
              kind="captions"
              srcLang="pt-br"
              src={ drinkDetail.strYoutube }
            />
          </video>
          <h4>Recomendadas</h4>
          {meals.length > sizeOfLength
            && meals
              .slice(startOfSlice, endOfSlice)
              .map((meal, index) => (
                <img
                  key={ meal.idMeal }
                  data-testid={ `${index}-recomendation-card` }
                  src={ meal.strMealsThumb }
                  alt="recomendations"
                />
              ))}
          {/*

          <img
            // data-testid={ `${index}-recomendation-card` }
            src=""
            alt="recomendations"
          /> */}
          <button data-testid="start-recipe-btn" type="button">
            Iniciar Receita
          </button>
        </div>
      </div>
      <button type="button">
        <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
      </button>
      <button type="button">
        <img
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
          alt="favorite-icon"
        />
      </button>
    </div>
  );
}

export default DetailsDrink;
