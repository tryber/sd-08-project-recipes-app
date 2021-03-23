import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoginAndFoodContext } from '../context/ContextFood';
import { getMealsDetails } from '../services/getAPIs';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import './DetailsMeal.css';

function DetailsMeal() {
  const dataContext = useContext(LoginAndFoodContext);
  const { meals } = dataContext;
  const Params = useParams();
  const [mealDetail, setMealDetail] = useState([]);
  useEffect(() => {
    const result = meals.filter((meal) => meal.idMeal === Params.id);
    const resultsMap = result.map((meal) => meal.idMeal);
    async function fetchDetails() {
      const saveDetail = await getMealsDetails(resultsMap);
      setMealDetail(saveDetail);
    }
    fetchDetails();
  }, [meals, Params.id]);

  console.log(mealDetail);

  return (
    <div>
      <div className="container-card-meal-details">
        {mealDetail.map((meal, index) => (
          <div className="card-meal-details" key={ meal.idMeal }>
            <img
              data-testid="recipe-photo"
              src={ meal.strMealThumb }
              alt="thumbnails-meal"
            />
            <h2 data-testid="recipe-title">{meal.strMeal}</h2>
            <p data-testid="recipe-category">{meal.strCategory}</p>
            <h3>Ingredients</h3>
            <ul>
              <li data-testid={ `${index}-ingredient-name-and-measure` }>
                {meal.strIngredient}
              </li>
            </ul>
            <h4>Instructions</h4>
            <p data-testid="instructions">{meal.strInstructions}</p>
            <h4>Video</h4>
            <video data-testid="video" src={ meal.strYoutube }>
              <track
                default
                kind="captions"
                srcLang="pt-br"
                src={ meal.strYoutube }
              />
            </video>
            <h4>Recomendadas</h4>
            <img
              data-testid={ `${index}-recomendation-card` }
              src=""
              alt="recomendations"
            />
            <button data-testid="start-recipe-btn" type="button">
              Iniciar Receita
            </button>

          </div>
        ))}
      </div>
      <button type="button">
        <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
      </button>
      <button type="button">
        <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="favorite-icon" />
      </button>

    </div>
  );
}

export default DetailsMeal;
