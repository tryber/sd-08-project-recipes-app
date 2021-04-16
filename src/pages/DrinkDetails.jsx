import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContainerRecipeDetails from '../components/ContainerRecipeDetails';
import { requestDrinkById } from '../services/requestDrinksAPI';
import { infinity } from '../common/svgStore';

function DrinkDetails({
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

  if (!drink) {
    return (
      <section className="loading-section">
        <img src={ infinity } className="loading-logo" alt="Infinity Logo" />
      </section>
    );
  }

  return (
    <section>
      {isLoading ? (
        <section className="loading-section">
          <img src={ infinity } className="loading-logo" alt="Infinity Logo" />
        </section>
      ) : (
        <ContainerRecipeDetails recipe={ drink[0] } page="Bebidas" />
      )}
    </section>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DrinkDetails;
