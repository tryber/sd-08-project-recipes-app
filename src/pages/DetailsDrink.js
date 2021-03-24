import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDrinksDetails } from '../services/getAPIs';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './DetailsDrink.css';

function DetailsDrink() {
  const Params = useParams();
  const [drinkDetail, setDrinkDetail] = useState([]);
  useEffect(() => {
    console.log('montou');
    console.log(Params.id);

    async function fetchDetails() {
      const saveDetail = await getDrinksDetails(Params.id);
      console.log(saveDetail);
      setDrinkDetail(saveDetail);
    }
    fetchDetails();
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
          <p data-testid="recipe-category">{drinkDetail.strCategory}</p>
          <h3>Ingredients</h3>
          <ul>
            {Object.entries(drinkDetail).reduce((acc, [key, value], index) => {
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
          <img
            // data-testid={ `${index}-recomendation-card` }
            src=""
            alt="recomendations"
          />
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
