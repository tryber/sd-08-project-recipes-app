import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import fetchMealActionId from '../redux/actions/fetchMealId';
import fetchDrinkActionId from '../redux/actions/fetchDrink';
import ShareButton from '../components/ShareButton';
import LikeButton from '../components/LikeButton';
import Recomendation from '../components/Recomendation';
import { clearSingleRecipe } from '../redux/actions/clearRecipesAction';
import IngredientList from '../components/IngredientList';

function FoodDetail() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const arrayId = pathname.split('/')[2];
  const arrayRecipes = pathname.split('/')[1];
  const recipes = useSelector((state) => state.recipes.singleRecipe);

  const history = useHistory();

  useEffect(() => {
    const fetchMeal = (id) => dispatch(fetchMealActionId(id));
    const fetchDrink = (id) => dispatch(fetchDrinkActionId(id));
    if (arrayRecipes === 'comidas' && recipes.length === 0) fetchMeal(arrayId);
    if (arrayRecipes === 'bebidas' && recipes.length === 0) fetchDrink(arrayId);
  }, []);

  useEffect(() => () => dispatch(clearSingleRecipe()), []);

  const recipe = recipes && recipes[0];

  const renderMeal = () => recipe !== undefined && (
    <div>
      {
        arrayRecipes === 'comidas'
          ? <img data-testid="recipe-photo" src={ recipe.strMealThumb } alt="img" />
          : <img data-testid="recipe-photo" src={ recipe.strDrinkThumb } alt="img" />
      }
      <ShareButton recipeId={ recipe.idMeal } recipeType="comida" />
      <LikeButton recipe={ recipe } />
      {
        arrayRecipes === 'comidas'
          ? <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
          : <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
      }
      {arrayRecipes === 'bebidas'
        && <p data-testid="recipe-category">{recipe.strAlcoholic}</p> }
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      Ingredients
      <IngredientList />
      Instructions
      <p data-testid="instructions">{recipe.strInstructions}</p>
      Video
      {
        arrayRecipes === 'comidas'
          && <iframe
            title="Meat"
            data-testid="video"
            width="420"
            height="315"
            src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
          />
      }
      Recomendadas
      <Recomendation />
      <button
        onClick={ () => history.push(`/${arrayRecipes}/${arrayId}/in-progress`) }
        data-testid="start-recipe-btn"
        type="button"
      >
        Iniciar Receita
      </button>
    </div>
  );

  // if (recipe) return <main><span>Loading</span></main>;
  return (
    <main>
      <div>
        {renderMeal()}
      </div>
    </main>
  );
}

export default FoodDetail;
