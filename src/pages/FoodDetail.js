import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import fetchMealActionId from '../redux/actions/fetchMealId';
import fetchDrinkActionId from '../redux/actions/fetchDrink';
import ShareButton from '../components/ShareButton';
import LikeButton from '../components/LikeButton';
import Recomendation from '../components/Recomendation';
import { clearSingleRecipe } from '../redux/actions/clearRecipesAction';
import IngredientList from '../components/IngredientList';
import BeginContinueRecipeBtn from '../components/BeginContinueRecipeBtn';
import '../CSS/FoodDetail.css';

function FoodDetail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = history.location;
  const arrayId = pathname.split('/')[2];
  const type = (pathname.split('/')[1] === 'comidas') ? 'Meal' : 'Drink';
  const { singleRecipe } = useSelector((state) => state.recipes);

  useEffect(() => {
    let fetchData;
    if (pathname.split('/')[1] === 'comidas' && singleRecipe.length === 0) {
      fetchData = (id) => dispatch(fetchMealActionId(id));
      fetchData(arrayId);
    }
    if (pathname.split('/')[1] === 'bebidas' && singleRecipe.length === 0) {
      fetchData = (id) => dispatch(fetchDrinkActionId(id));
      fetchData(arrayId);
    }
  }, []);

  useEffect(() => () => dispatch(clearSingleRecipe()), []);

  const recipe = singleRecipe && singleRecipe[0];

  const renderMeal = () => recipe !== undefined && (
    <div className="detail-main-container">
      <div className="detail-header-container">
        <img
          data-testid="recipe-photo"
          src={ recipe[`str${type}Thumb`] }
          alt="img"
          className="detail-img"
        />
        <h1
          data-testid="recipe-title"
          className="detail-title"
        >
          { recipe[`str${type}`] }
        </h1>
        <div className="buttons-container">
          <ShareButton recipeId={ recipe.idMeal } recipeType="comida" />
          <LikeButton recipe={ recipe } />
        </div>
      </div>
      <div className="detail-info">
        {type === 'Drink'
        && <p data-testid="recipe-category">{recipe.strAlcoholic}</p> }
        <p data-testid="recipe-category">{recipe.strCategory}</p>
        <span className="detail-subtitle">Ingredients:</span>
        <div className="detail-ingredients">
          <IngredientList />
        </div>
        <span className="detail-subtitle">Instructions:</span>
        <div className="detail-ingredients">
          <p data-testid="instructions">{recipe.strInstructions}</p>
        </div>
      </div>
      { type === 'Meal' && (
        <div className="details-video">
          <span className="detail-subtitle">Video:</span>
          <iframe
            title="Meat"
            data-testid="video"
            src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
          />
        </div>)}
      <div className="detail-recomendation">
        <span className="detail-subtitle">Recomendadas:</span>
        <Recomendation />
      </div>
      <BeginContinueRecipeBtn />
    </div>
  );

  return (
    <main>
      <div>
        {renderMeal()}
      </div>
    </main>
  );
}

export default FoodDetail;
