import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import MealDetails from '../../components/MealDetails';
import Recomendations from '../../components/Recomendations';

function MealRecipeDetails({ match }) {
  const { id } = match.params;
  const [meal, setMeal] = useState({});

  useEffect(() => {
    async function getMealById(value) {
      const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${value}`);
      const response = await data.json();
      console.log(response.meals[0]);
      setMeal(response.meals[0]);
    }
    getMealById(id);
  }, [id]);

  return (
    <div>
      <MealDetails meal={ meal } />
      <Recomendations recipeType="meal" />
      <button type="button" data-testid="start-recipe-btn">Iniciar receita</button>
    </div>
  );
}

MealRecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MealRecipeDetails;
