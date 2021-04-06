import React, { useContext } from 'react';
import RecipesContext from '../../ContextApi/RecipesContext';

export default function Carousel() {
  const { recipes } = useContext(RecipesContext);

  const recomendations = recipes.meals;
  const cardMax = 6;

  return (
    recomendations
      ? (
        <div className="recommendation">
          {recomendations.map((item, index) => {
            if (index >= cardMax) return '';
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
                <p data-testid={ `${index}-recomendation-title` }>
                  {item.strMeal}
                </p>
              </div>
            );
          })}
        </div>
        // <div>{console.log(cocktails)}</div>
      ) : ''
  );
}
