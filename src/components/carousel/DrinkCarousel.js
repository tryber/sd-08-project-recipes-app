import React, { useContext } from 'react';
import RecipesContext from '../../ContextApi/RecipesContext';

export default function Carousel() {
  const { cocktails } = useContext(RecipesContext);

  const recomendations = cocktails.drinks;
  const cardMax = 6;

  return (
    recomendations
      ? (
        <div className="recommendation-item">
          {recomendations.map((item, index) => {
            if (index >= cardMax) return '';
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
        // <div>{console.log(cocktails)}</div>
      ) : ''
  );
}
