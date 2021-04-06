import React, { useState, useEffect } from 'react';
import { requestDrinksList } from '../services/apiRequests';

function RecommendedDrinks() {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const MAX_LENGTH = 5;

  useEffect(() => {
    async function requestMeals() {
      const recipes = await requestDrinksList();
      setRecommended(recipes);
      setLoading(false);
    }
    requestMeals();
  }, []);

  if (loading) {
    return (
      <p>loading</p>
    );
  }
  return (
    <ul className="scroll-menu">
      {
        recommended.map((drink, index) => {
          if (index <= MAX_LENGTH) {
            return (
              <li
                data-testid={ `${index}-recomendation-card` }
                key={ index }
                className="recommended-drinks"
              >
                <h1 data-testid={ `${index}-recomendation-title` }>
                  {drink.strDrink}
                </h1>
              </li>
            );
          }
          return '';
        })
      }
    </ul>
  );
}

export default RecommendedDrinks;
