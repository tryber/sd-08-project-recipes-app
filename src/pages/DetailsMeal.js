import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataDrinksContext } from '../context/ContextDrinks';
import { getMealsDetails } from '../services/getAPIs';
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
      const saveDetail = await getMealsDetails(Params.id);
      setMealDetail(saveDetail);
    }
    fetchDetails();
  }, []);

  const sizeOfLength = 3;
  const startOfSlice = 0;
  const endOfSlice = 2;
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
                  </li>,
                );
              }
              return acc;
            }, [])}
          </ul>
          <h4>Instructions</h4>
          <p data-testid="instructions">{mealDetail.strInstructions}</p>
          <h4>Video</h4>
          <video data-testid="video" src={ mealDetail.strYoutube }>
            <track
              default
              kind="captions"
              srcLang="pt-br"
              src={ mealDetail.strYoutube }
            />
          </video>
          <h4>Recomendadas</h4>
          {drinks.length > sizeOfLength
            && drinks
              .slice(startOfSlice, endOfSlice)
              .map((drink, index) => (
                <img
                  key={ drink.idDrink }
                  data-testid={ `${index}-recomendation-card` }
                  src={ drink.strDrinkThumb }
                  alt="recomendations"
                />
              ))}
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

export default DetailsMeal;
