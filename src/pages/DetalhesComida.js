import React, { useContext, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Context from '../context/Context';
import RecipeDetails from '../components/RecipeDetails';
import DetailsButtons from '../components/DetailsButtons';

const idsF = JSON.parse(localStorage.getItem('doneRecipes')) || [];

function DetalhesComida({ match }) {
  const { requestRecipeDetails } = useContext(Context);
  const { id } = match.params;

  useEffect(() => {
    requestRecipeDetails('themealdb', id, 'thecocktaildb');
    document.getElementById('start-recipe-btn').style.display = 'block';
    if (idsF.includes(id)) {
      document.getElementById('start-recipe-btn').style.display = 'none';
    }
  }, []);

  return (
    <main>
      <div>
        <RecipeDetails recipeType="Meal" page="details" />
      </div>
      <div>
        <DetailsButtons route="comidas" id={ id } page="details" />
      </div>
    </main>
  );
}

DetalhesComida.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default DetalhesComida;
