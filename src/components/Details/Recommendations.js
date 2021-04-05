import React from 'react';
import { useSelector } from 'react-redux';
import { useIsMeal } from '../../services/customHooks';
import DrinkCard from './DrinkCard';
import MealCard from './MealCard';

export default function Recommendations() {
  const recommendations = useSelector((state) => state.detailsReducer.recommendations);
  const maxRecommended = 6;
  const isMeal = useIsMeal();
  return (
    <div className="recommendations-details">
      <h1>Recomendadas</h1>
      <button
        type="button"
        className="carousel-details-scroll"
      >
        {
          recommendations.slice(0, maxRecommended).map((e, i) => (
            isMeal ? <DrinkCard
              data={ {
                drink: {
                  strDrinkThumb: e.strDrinkThumb,
                  strDrink: e.strDrink,
                },
                index: i,
              } }
              key={ `recommendReactKey${e.idDrink}` }
            /> : <MealCard
              data={ {
                meal: {
                  strMealThumb: e.strMealThumb,
                  strMeal: e.strMeal,
                },
                index: i,
              } }
              key={ `recommendReactKey${e.idMeal}` }
            />
          ))
        }
      </button>
    </div>
  );
}
