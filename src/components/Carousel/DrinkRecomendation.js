import React, { useContext } from 'react';
import FoodContext from '../../context/comidaContext/FoodContext';
import '../../index.css';

function DrinkRecomendation() {
  const {
    values: {
      recomendations,
    },
  } = useContext(FoodContext);

  const LAST_CARD_CAROUSEL = 6;

  return (
    <div className="recommendation">
      {recomendations.map((item, index) => {
        if (index >= LAST_CARD_CAROUSEL) return '';
        return (
          <div
            key={ item.strDrink }
            className="recommendation-item"
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-recomendation-title` }>
              {item.strDrink}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default DrinkRecomendation;
