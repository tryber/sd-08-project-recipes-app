import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HeaderRecipeDetails from './HeaderRecipeDetails';
import IngredientsRecipeDetails from './IngredientsRecipeDetails';
import InstructionsRecipeDetails from './InstructionsRecipeDetails';
import VideoRecipeDetails from './VideoRecipeDetails';
import RecommendedRecipeDetails from './RecommendedRecipeDetails';
import Button from './Button';
import { requestSixDrinks } from '../services/requestDrinksAPI';
import { requestSixMeals } from '../services/requestFoodsAPI';

const ContainerRecipeDetails = ({ recipe, page }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [recommended, setRecommended] = useState([]);
  const [recipeInfo, setRecipeInfo] = useState({});

  const getIngredientsMeasure = (ingredientsSize) => {
    const arrayIngredients = [];
    for (let i = 1; i <= ingredientsSize; i += 1) {
      if (
        recipe[`strIngredient${i}`] !== ''
        && recipe[`strIngredient${i}`] !== null
      ) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        arrayIngredients.push(`${ingredient} - ${measure}`);
      }
    }
    return arrayIngredients;
  };

  const foodInfo = () => {
    const {
      idMeal: id,
      strMeal: name,
      strCategory: category,
      strMealThumb: image,
      strInstructions: instructions,
      strYoutube: video,
      strDrinkAlternate: aternateRecipe,
    } = recipe;
    const ingredientsSize = 20;
    const arrayIngredients = getIngredientsMeasure(ingredientsSize);
    setRecipeInfo({
      name,
      category,
      image,
      instructions,
      video,
      aternateRecipe,
      arrayIngredients,
      route: `/comidas/${id}/in-progress`,
    });
  };

  const drinkInfo = () => {
    const {
      idDrink: id,
      strDrink: name,
      strAlcoholic: category,
      strDrinkThumb: image,
      strInstructions: instructions,
      strVideo: video,
      strDrinkAlternate: aternateRecipe,
    } = recipe;
    const ingredientsSize = 15;
    const arrayIngredients = getIngredientsMeasure(ingredientsSize);
    setRecipeInfo({
      name,
      category,
      image,
      instructions,
      video,
      aternateRecipe,
      arrayIngredients,
      route: `/bebidas/${id}/in-progress`,
    });
  };

  useEffect(() => {
    async function getRecommendeds() {
      setIsLoading(true);
      if (page === 'Comidas') {
        const foodsRecommended = await requestSixDrinks();
        setRecommended(foodsRecommended);
        foodInfo();
      } else if (page === 'Bebidas') {
        const drinksRecommended = await requestSixMeals();
        setRecommended(drinksRecommended);
        drinkInfo();
      }
      setIsLoading(false);
    }
    getRecommendeds();
  }, []);

  const {
    name,
    category,
    image,
    instructions,
    video,
    arrayIngredients,
    route,
  } = recipeInfo;

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <section>
          <HeaderRecipeDetails
            title={ name }
            category={ category }
            imgPath={ image }
          />
          <IngredientsRecipeDetails ingredients={ arrayIngredients } />
          <InstructionsRecipeDetails instruction={ instructions } />
          {video ? <VideoRecipeDetails videoPath={ video } /> : ''}
          <RecommendedRecipeDetails
            recommendedRecipes={ recommended }
            page={ page }
          />
          <Link to={ route }>
            <Button
              name="Iniciar Receita"
              data-testid="start-recipe-btn"
              className="start-recipe-btn"
            />
          </Link>
        </section>
      )}
    </div>
  );
};

ContainerRecipeDetails.propTypes = {
  page: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    strMeal: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
    strYoutube: PropTypes.string.isRequired,
    strDrinkAlternate: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strVideo: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
    idMeal: PropTypes.string.isRequired,
    idDrink: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContainerRecipeDetails;
