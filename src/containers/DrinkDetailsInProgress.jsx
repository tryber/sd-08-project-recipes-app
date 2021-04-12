import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import components from '../components';
import api from '../services';

const DrinkDetailsInProgress = () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  const id = history.location.pathname;
  const res = id.replace(/\D/g, ''); // https://stackoverflow.com/questions/30607419/return-only-numbers-from-string/30607466
  useEffect(() => {
    api.fetchDrinkById(res)
      .then((response) => response.json())
      .then((result) => setData(result.drinks));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className="home-container"
    >
      {data && data.map((
        { strDrink, strDrinkThumb, strCategory, strInstructions, idDrink }, index, object,
      ) => (
        <div key={ index }>
          <components.FoodInProgressCard
            idDrink={ idDrink }
            data={ object }
            img={ strDrinkThumb }
            meal={ strDrink }
            category={ strCategory }
            instructions={ strInstructions }
          />
        </div>
      ))}
    </div>
  );
};

export default DrinkDetailsInProgress;
