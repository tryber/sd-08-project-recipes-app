import React, { useContext, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Context from '../context/Context';
import RecipeDetails from '../components/RecipeDetails';
import DetailsButtons from '../components/DetailsButtons';

function ProcessoComida({ match }) {
  const { requestRecipeDetails } = useContext(Context);
  const { id } = match.params;

  useEffect(() => {
    requestRecipeDetails('themealdb', id, 'thecocktaildb');
  }, []);

  return (
    <main>
      <RecipeDetails recipeType="Meal" />
      <DetailsButtons recipeType="Meal" route="comidas" id={ id } />
    </main>
  );
}

ProcessoComida.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default ProcessoComida;
