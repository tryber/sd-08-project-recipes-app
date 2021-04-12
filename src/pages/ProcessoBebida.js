import React, { useContext, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Context from '../context/Context';
import RecipeDetails from '../components/RecipeDetails';
import DetailsButtons from '../components/DetailsButtons';

function ProcessoBebida({ match }) {
  const { requestRecipeDetails } = useContext(Context);
  const { id } = match.params;

  useEffect(() => {
    requestRecipeDetails('thecocktaildb', id, 'themealdb');
  }, []);

  return (
    <main>
      <RecipeDetails recipeType="Drink" />
      <DetailsButtons recipeType="Drink" route="bebidas" id={ id } />
    </main>
  );
}

ProcessoBebida.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default ProcessoBebida;
