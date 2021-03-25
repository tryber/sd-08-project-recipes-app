import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import getResultFromAPI from '../api/getResultFromAPI';

function Recomendations() {
  const PATHSIZE = 8;
  const SIX_RECOMMENDATIONS = 6;
  const { pathname } = useLocation();
  const [recomended, setRecomended] = useState([]);

  useEffect(() => {
    async function getFood() {
      const foods = await getResultFromAPI(pathname.slice(0, PATHSIZE));
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
          <FoodCard index={ index } food={ food } />
        </li>
      ))}
    </ul>
  );
}

export default Recomendations;
