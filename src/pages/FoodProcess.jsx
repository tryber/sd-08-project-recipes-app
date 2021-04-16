import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { requestFoodById } from '../services/requestFoodsAPI';
import ContainerInProgressRecipes from '../components/ContainerInProgressRecipes';
import { infinity } from '../common/svgStore';

function FoodProcess({
  match: {
    params: { id },
  },
}) {
  const [meal, setMeal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function requestApi() {
      const foodRecipe = await requestFoodById(id);
      setMeal(foodRecipe);
      setIsLoading(false);
    }
    requestApi();
  }, [id]);
  return (
    <section>
      {isLoading ? (
        <section className="loading-section">
          <img src={ infinity } className="loading-logo" alt="Infinity Logo" />
        </section>
      ) : (
        <ContainerInProgressRecipes recipe={ meal[0] } page="Comidas" id={ id } />
      )}
      <br />
      <br />
    </section>
  );
}

FoodProcess.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default FoodProcess;
