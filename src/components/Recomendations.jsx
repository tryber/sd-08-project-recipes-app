import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import getResultFromAPI from '../api/getResultFromAPI';
import RecomendationCard from './RecomendationCard';
import alternatePath from '../services/alternatePath';
import '../css/Recomendations.css';

function Recomendations() {
  const SIX_RECOMMENDATIONS = 6;
  const { pathname } = useLocation();
  const [recomended, setRecomended] = useState([]);

  useEffect(() => {
    async function getFood() {
      const drinkOrFood = alternatePath(pathname);
      const foods = await getResultFromAPI(drinkOrFood);
      // console.log(foods);
      setRecomended(foods.slice(0, SIX_RECOMMENDATIONS));
    }
    getFood();
  }, []);

  return (
    <ul className="recommendationList">
      { recomended.map((food, index) => (
        <li
          key={ index }
          data-testid={ `${index}-recomendation-card` }
        >
          <RecomendationCard index={ index } food={ food } />
        </li>
      ))}
    </ul>
  );
}

export default Recomendations;
