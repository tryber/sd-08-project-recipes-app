import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HeaderRecipeDetails from './HeaderRecipeDetails';
import IngredientsRecipeDetailsInProgress from './IngredientsRecipeDetailsInProgress';
import InstructionsRecipeDetails from './InstructionsRecipeDetails';
import Button from './Button';
import {
  setInProgressRecipes,
  setDoneRecipes,
} from '../services/setLocalStorage';

const ContainerInProgressRecipes = ({ recipe, page, id }) => {
  const [recipeInfo, setRecipeInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [buttonState, setButtonState] = useState(true);
  const getIngredientsMeasure = useCallback((ingredientsSize) => {
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
  }, [recipe]);

  const foodInfo = useCallback(() => {
    const {
      idMeal: idRecipe,
      strMeal: name,
      strCategory: category,
      strMealThumb: image,
      strInstructions: instructions,
      strYoutube: video,
      strDrinkAlternate: aternateRecipe,
      strArea: area,
      strTags,
    } = recipe;
    const ingredientsSize = 20;
    const arrayIngredients = getIngredientsMeasure(ingredientsSize);
    setRecipeInfo({
      idRecipe,
      name,
      category,
      image,
      instructions,
      video,
      aternateRecipe,
      arrayIngredients,
      drinkCategory: '',
      area,
      strTags,
    });
  }, [getIngredientsMeasure, recipe]);

  const drinkInfo = useCallback(() => {
    const {
      idDrink: idRecipe,
      strDrink: name,
      strAlcoholic: category,
      strDrinkThumb: image,
      strInstructions: instructions,
      strVideo: video,
      strDrinkAlternate: aternateRecipe,
      strCategory: drinkCategory,
      strTags,
    } = recipe;
    const ingredientsSize = 15;
    const arrayIngredients = getIngredientsMeasure(ingredientsSize);
    setRecipeInfo({
      idRecipe,
      name,
      category,
      image,
      instructions,
      video,
      aternateRecipe,
      arrayIngredients,
      drinkCategory,
      area: '',
      strTags,
    });
  }, [getIngredientsMeasure, recipe]);

  const {
    idRecipe,
    name,
    category,
    image,
    instructions,
    arrayIngredients,
    area,
    drinkCategory,
    strTags,
  } = recipeInfo;

  const finishRecipe = () => {
    const doneRecipe = {
      id: idRecipe,
      type: page.toLowerCase().replace('s', ''),
      area,
      category,
      alcoholicOrNot: drinkCategory,
      name,
      image,
      doneDate: new Date().toLocaleDateString(),
      tags: strTags ? strTags.split(',') : '',
    };
    setDoneRecipes(doneRecipe);
  };

  useEffect(() => {
    setIsLoading(true);
    if (page === 'Comidas') {
      foodInfo();
    } else if (page === 'Bebidas') {
      drinkInfo();
    }
    setInProgressRecipes(id, page);
    setIsLoading(false);
  }, [drinkInfo, foodInfo, id, page]);

  return (
    <main>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <section>
          <HeaderRecipeDetails
            title={ name }
            category={ category }
            imgPath={ image }
            page={ page.toLowerCase() }
            id={ idRecipe }
            area={ area }
            drinkCategory={ drinkCategory }
          />
          <IngredientsRecipeDetailsInProgress
            ingredients={ arrayIngredients }
            page={ page }
            id={ idRecipe }
            callback={ () => setButtonState(false) }
          />
          <InstructionsRecipeDetails instruction={ instructions } />
          <Link to="/receitas-feitas">
            <div className="start-finish-btn">
              <Button
                name="Finalizar Receita"
                data-testid="finish-recipe-btn"
                className="start-recipe-btn btn btn-danger"
                onClick={ finishRecipe }
                disabled={ buttonState }
              />
            </div>
          </Link>
        </section>
      )}
    </main>
  );
};

ContainerInProgressRecipes.propTypes = {
  page: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
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
    strTags: PropTypes.string,
  }),
};

ContainerInProgressRecipes.defaultProps = {
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
    strTags: '',
  }),
};

export default ContainerInProgressRecipes;
