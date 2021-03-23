import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataDrinksContext } from '../context/ContextDrinks';
import { getDrinksDetails } from '../services/getAPIs';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './DetailsDrink.css';

function DetailsDrink() {
  const dataContext = useContext(DataDrinksContext);
  const { drinks } = dataContext;
  const Params = useParams();
  const [drinkDetail, setDrinkDetail] = useState([]);
  useEffect(() => {
    const result = drinks.filter((drink) => drink.idDrink === Params.id);
    const resultsMap = result.map((drink) => drink.idDrink);
    async function fetchDetails() {
      const saveDetail = await getDrinksDetails(resultsMap);
      setDrinkDetail(saveDetail);
      console.log(saveDetail);
    }
    fetchDetails();
  }, [drinks, Params.id]);

  console.log(drinkDetail);

  return (
    <div>
      <div className="container-card-drink-details">
        {drinkDetail.map((drink, index) => (
          <div
            className="card-drink-details"
            key={ drink.idDrink }
          >
            <img
              data-testid="recipe-photo"
              src={ drink.strDrinkThumb }
              alt="thumbnails-drink"
            />
            <h2 data-testid="recipe-title">{drink.strDrink}</h2>
            <p data-testid="recipe-category">{drink.strCategory}</p>
            <h3>Ingredients</h3>
            <ul>
              <li data-testid={ `${index}-ingredient-name-and-measure` }>
                {drink.strIngredient}
              </li>
            </ul>
            <h4>Instructions</h4>
            <p data-testid="instructions">{drink.strInstructions}</p>
            <h4>Video</h4>
            <video data-testid="video" src={ drink.strYoutube }>
              <track
                default
                kind="captions"
                srcLang="pt-br"
                src={ drink.strYoutube }
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

export default DetailsDrink;
