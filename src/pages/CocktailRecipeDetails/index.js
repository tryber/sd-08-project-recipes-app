import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DrinkDetails from '../../components/DrinkDetails';
import Recomendations from '../../components/Recomendations';

function CocktailRecipeDetails({ match }) {
  const { id } = match.params;
  const [drink, setDrink] = useState({});

  useEffect(() => {
    async function getDrinkById(value) {
      const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${value}`);
      const response = await data.json();
      setDrink(response.drinks[0]);
    }
    getDrinkById(id);
  }, [id]);

  return (
    <div>
      <DrinkDetails drink={ drink } />
      <Recomendations recipeType="drink" />
      <Link
        to={ `/bebidas/${id}/in-progress` }
        data-testid="start-recipe-btn"
      >
        Iniciar receita
      </Link>
    </div>
  );
}

CocktailRecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default CocktailRecipeDetails;
