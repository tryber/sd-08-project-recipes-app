import React, { useContext, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Context from '../context/Context';
import RecipeDetails from '../components/RecipeDetails';
import DetailsButtons from '../components/DetailsButtons';

const ids = JSON.parse(localStorage.getItem('finishedRecipes')) || [];

function DetalhesBebida({ match }) {
  const { requestRecipeDetails } = useContext(Context);
  const { id } = match.params;

  useEffect(() => {
    requestRecipeDetails('thecocktaildb', id, 'themealdb');
    document.getElementById('start-recipe-btn').style.display = 'block';
    if (ids.includes(id)) {
      document.getElementById('start-recipe-btn').style.display = 'none';
    }
  }, []);

  return (
    <main>
      <div>
        <RecipeDetails recipeType="Drink" page="details" />
      </div>
      <div>
        <DetailsButtons route="bebidas" id={ id } page="details" />
      </div>
    </main>
  );
}

DetalhesBebida.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default DetalhesBebida;
