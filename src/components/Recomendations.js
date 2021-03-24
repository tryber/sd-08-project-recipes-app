import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Recomendations({ recipeType }) {
  const [recomendations, setRecomendations] = useState([]);
  const url = (recipeType === 'meal') ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const recomendationType = (recipeType === 'meal') ? 'Drink' : 'Meal';

  useEffect(() => {
    async function getRecomendations() {
      const data = await fetch(url);
      const response = await data.json();
      console.log(response);
      const key = Object.keys(response)[0];
      setRecomendations(response[key]);
    }
    getRecomendations();
  }, [url]);

  return (
    <div>
      {recomendations.map((recomendation, index) => (
        <div key={ index } data-testid={ `${index}-recomendation-card` }>
          {recomendation[`str${recomendationType}`]}
        </div>
      ))}
    </div>
  );
}

Recomendations.propTypes = {
  recipeType: PropTypes.string.isRequired,
};

export default Recomendations;
