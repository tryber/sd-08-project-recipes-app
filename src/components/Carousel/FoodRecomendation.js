import React, { useContext } from 'react';
import DrinkContext from '../../context/bebidaContext/DrinkContext';
import '../../index.css';

function FoodRecomendation() {
  const {
    values: {
      recomendations,
    },
  } = useContext(DrinkContext);

  const LAST_CARD_CAROUSEL = 6;

  return (
    <div className="recommendation">
      {recomendations.map((item, index) => {
        if (index >= LAST_CARD_CAROUSEL) return '';
        return (
          <div
            key={ item.strMeal }
            className="recommendation-item"
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              src={ item.strMealThumb }
              alt={ item.strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-recomendation-title` }>{item.strMeal}</p>
          </div>
        );
      })}
    </div>
  );
}

export default FoodRecomendation;
