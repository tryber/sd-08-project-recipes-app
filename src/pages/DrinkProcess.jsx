import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContainerInProgressRecipes from '../components/ContainerInProgressRecipes';
import { requestDrinkById } from '../services/requestDrinksAPI';

function DrinkProcess({
  match: {
    params: { id },
  },
}) {
  const [drink, setDrink] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function requestApi() {
      const drinkRecipe = await requestDrinkById(id);
      setDrink(drinkRecipe);
      setIsLoading(false);
    }
    requestApi();
  }, [id]);
  return (
    <section>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <ContainerInProgressRecipes recipe={ drink[0] } page="Bebidas" id={ id } />
      )}
    </section>
  );
}

DrinkProcess.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DrinkProcess;
