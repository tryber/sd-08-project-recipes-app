import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import components from '../components';
import api from '../services';

const FoodDetailsInProgress = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const id = history.location.pathname;
  const res = id.replace(/\D/g, ''); // https://stackoverflow.com/questions/30607419/return-only-numbers-from-string/30607466

  useEffect(() => {
    api.fetchMealById(res)
      .then((response) => response.json())
      .then((result) => setData(result.meals));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (

    <div>
      {data && data.map((
        { strMeal, strMealThumb, strCategory, strInstructions, idMeal }, index, object,
      ) => (
        <div className="home-container" key={ index }>
          <components.FoodInProgressCard
            data={ object }
            img={ strMealThumb }
            meal={ strMeal }
            category={ strCategory }
            instructions={ strInstructions }
            idMeal={ idMeal }
          />
        </div>
      ))}
    </div>
  );
};

export default FoodDetailsInProgress;
