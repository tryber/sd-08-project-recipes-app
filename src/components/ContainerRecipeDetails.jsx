import React, { useCallback, useEffect, useState } from 'react';
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
import { setInProgressRecipes } from '../services/setLocalStorage';
import { nameButtonRecipe } from '../services/getLocalStorage';
import { infinity } from '../common/svgStore';

const ContainerRecipeDetails = ({ recipe, page }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [recommended, setRecommended] = useState([]);
  const [recipeInfo, setRecipeInfo] = useState({});

  const getIngredientsMeasure = useCallback(
    (ingredientsSize) => {
      const arrayIngredients = [];
      for (let i = 1; i <= ingredientsSize; i += 1) {
        if (
          recipe[`strIngredient${i}`] !== ''
          && recipe[`strIngredient${i}`] !== null
        ) {
          const ingredient = recipe[`strIngredient${i}`];
          const measure = recipe[`strMeasure${i}`];
          arrayIngredients.push(
            `${ingredient} - ${measure}`.replace('- null', ''),
          );
        }
      }
      return arrayIngredients;
    },
    [recipe],
  );

  const foodInfo = useCallback(() => {
    const {
      idMeal: id,
      strMeal: name,
      strCategory: category,
      strMealThumb: image,
      strInstructions: instructions,
      strYoutube: video,
      strDrinkAlternate: aternateRecipe,
      strArea: area,
    } = recipe;
    const ingredientsSize = 20;
    const arrayIngredients = getIngredientsMeasure(ingredientsSize);
    setRecipeInfo({
      id,
      name,
      category,
      image,
      instructions,
      video,
      aternateRecipe,
      arrayIngredients,
      drinkCategory: '',
      area,
      route: `/comidas/${id}/in-progress`,
    });
  }, [getIngredientsMeasure, recipe]);

  const drinkInfo = useCallback(() => {
    const {
      idDrink: id,
      strDrink: name,
      strAlcoholic: category,
      strDrinkThumb: image,
      strInstructions: instructions,
      strVideo: video,
      strDrinkAlternate: aternateRecipe,
      strCategory: drinkCategory,
    } = recipe;
    const ingredientsSize = 15;
    const arrayIngredients = getIngredientsMeasure(ingredientsSize);
    setRecipeInfo({
      id,
      name,
      category,
      image,
      instructions,
      video,
      aternateRecipe,
      arrayIngredients,
      drinkCategory,
      area: '',
      route: `/bebidas/${id}/in-progress`,
    });
  }, [getIngredientsMeasure, recipe]);

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
  }, [drinkInfo, foodInfo, page]);

  const {
    id,
    name,
    category,
    image,
    instructions,
    video,
    arrayIngredients,
    route,
    area,
    drinkCategory,
  } = recipeInfo;
  return (
    <div>
      {isLoading ? (
        <section className="loading-section">
          <img src={ infinity } className="loading-logo" alt="Infinity Logo" />
        </section>
      ) : (
        <main>
          <HeaderRecipeDetails
            title={ name }
            category={ category }
            imgPath={ image }
            page={ page.toLowerCase() }
            id={ id }
            area={ area }
            drinkCategory={ drinkCategory }
          />
          <IngredientsRecipeDetails ingredients={ arrayIngredients } />
          <InstructionsRecipeDetails instruction={ instructions } />
          {video ? <VideoRecipeDetails videoPath={ video } /> : ''}
          <RecommendedRecipeDetails
            recommendedRecipes={ recommended }
            page={ page }
          />
          {nameButtonRecipe(id, page) === 'none' ? (
            ''
          ) : (
            <Link to={ route }>
              <div className="start-finish-btn">
                <Button
                  name={ nameButtonRecipe(id, page) }
                  data-testid="start-recipe-btn"
                  className="start-recipe-btn btn btn-danger"
                  onClick={ () => setInProgressRecipes(id, page, arrayIngredients) }
                />
              </div>
            </Link>
          )}
          <br />
          <br />
        </main>
      )}
    </div>
  );
};

ContainerRecipeDetails.propTypes = {
  page: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    strMeal: PropTypes.string,
    strCategory: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string,
    strInstructions: PropTypes.string.isRequired,
    strYoutube: PropTypes.string,
    strDrinkAlternate: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strVideo: PropTypes.string,
    strAlcoholic: PropTypes.string,
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strArea: PropTypes.string,
  }),
};

ContainerRecipeDetails.defaultProps = {
  recipe: PropTypes.shape({
    strDrinkAlternate: '',
    strDrink: '',
    strDrinkThumb: '',
    strVideo: '',
    strAlcoholic: '',
    idDrink: '',
    strMeal: '',
    strMealThumb: '',
    strYoutube: '',
    idMeal: '',
    strArea: '',
  }),
};
export default ContainerRecipeDetails;
