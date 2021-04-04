import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../../context/Context';
import Recommendations from '../../component/Recommendations';
import { ShareDisplay, FavoriteButton } from '../../component';
import { getRecipesInProgress } from '../../services/localStorage';
import RecipesDetails from '../../styles/RecipesDetails';

export default function FoodDetails({
  match: {
    params: { id },
  },
}) {
  const { recipeDetail, setSearchParams } = useContext(Context);
  const history = useHistory();
  const [recipe, setRecipe] = useState();

  const recipeInProgress = () => getRecipesInProgress().cocktails[id];

  useEffect(
    () => setSearchParams({
      searchInput: id,
      selectedParameter: 'recipe',
      location: history.location.pathname,
    }),
    [setSearchParams, history.location.pathname, id],
  );

  useEffect(() => setRecipe(...recipeDetail), [recipeDetail, setRecipe]);

  if (!recipe) return <div>Carregando...</div>;

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
    strArea,
  } = recipe;

  const ingredients = Object.keys(recipe)
    .filter((prop) => prop.includes('strIngredient'))
    .map((ingredient) => recipe[ingredient])
    .filter((ingredient) => ingredient);

  const measures = Object.keys(recipe)
    .filter((prop) => prop.includes('strMeasure'))
    .map((measure) => recipe[measure])
    .filter((measure) => measure);

  return (
    <RecipesDetails>
      <img data-testid="recipe-photo" src={ strMealThumb } alt="Recipe Done" />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <FavoriteButton
        recipeInfo={ {
          id,
          type: 'comida',
          area: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        } }
      />
      <ShareDisplay />
      <h5 data-testid="recipe-category">{strCategory}</h5>
      <div className="ingredient">
        {ingredients.map((ingredient, index) => (
          <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`-${ingredient} - ${measures[index]}`}
          </p>
        ))}
      </div>
      <p data-testid="instructions" className="instructions">
        {strInstructions}
      </p>
      <div className="video-container">
        <iframe
          data-testid="video"
          title="Recipe"
          src={ strYoutube.replace('watch?v=', 'embed/') }
        />
      </div>
      <Link
        to={ `/comidas/${id}/in-progress` }
        data-testid="start-recipe-btn"
        className="start-resume-recipe"
        onClick={ () => {
          if (!recipeInProgress) {
            localStorage.setItem(
              'inProgressRecipes',
              JSON.stringify([...getRecipesInProgress(), id]),
            );
          }
        } }
      >
        {recipeInProgress ? 'Continuar Receita' : 'Iniciar Receita'}
      </Link>
      <Recommendations />
    </RecipesDetails>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
