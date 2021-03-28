import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContainerRecipeDetails from '../components/ContainerRecipeDetails';
import { requestFoodById } from '../services/requestFoodsAPI';

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
  }, []);

  return (
    <section>
      {isLoading ? (
        <h1>LOADING...</h1>
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
