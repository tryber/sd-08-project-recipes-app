import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContainerRecipeDetails from '../components/ContainerRecipeDetails';
import { requestFoodById } from '../services/requestFoodsAPI';
import { infinity } from '../common/svgStore';

function FoodDetails({
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
        <ContainerRecipeDetails recipe={ meal[0] } page="Comidas" />
      )}
    </section>
  );
}
FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
export default FoodDetails;
