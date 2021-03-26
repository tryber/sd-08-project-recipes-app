import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MAX_INGREDIENTS_NUMBER, UNITARY_INCREMENT } from '../../common/defs';
import Category from '../../components/InProgressComponents/Category';
import FavoriteAndShare from '../../components/InProgressComponents/FavoriteAndShare';
import Hero from '../../components/InProgressComponents/Hero';
import IngredientsList from '../../components/InProgressComponents/IngredientsList';
import Instructions from '../../components/InProgressComponents/Instructions';
import Title from '../../components/InProgressComponents/Title';
import RecipesContext from '../../context/RecipesContext';

export default function MealRecipeInProgress({ match }) {
  const { isFinished } = useContext(RecipesContext);
  const [ingredients, setIngredients] = useState([]);
  const [meal, setMeal] = useState(
    {
      strMeal: 'Title',
      strMealThumb: 'Image',
      strCategory: 'Category',
      strInstructions: 'Recipe',
      ingredients: [{ ingredient: 'ingredient' }],
      id: 'id',
    },
  );

  const { strMeal, strMealThumb, strCategory, strInstructions } = meal;
  const { id } = match.params;

  useEffect(() => {
    async function getMealById(value) {
      const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${value}`);
      const response = await data.json();
      setMeal(response.meals[0]);
    }
    getMealById(id);
  }, [id]);

  useEffect(() => {
    if (meal !== undefined) {
      const arrayOfIngredients = [];
      for (let index = 1; index <= MAX_INGREDIENTS_NUMBER; index += UNITARY_INCREMENT) {
        if (meal[`strIngredient${index}`] !== null
        && meal[`strIngredient${index}`] !== undefined
        && meal[`strIngredient${index}`] !== '') {
          const ingredientObject = {
            ingredient: meal[`strIngredient${index}`],
            measure: meal[`strMeasure${index}`],
          };
          arrayOfIngredients.push(ingredientObject);
        }
      }
      setIngredients(arrayOfIngredients);
    }
  }, [meal]);

  return (
    <section>
      <Hero src={ strMealThumb } name={ strMeal } />
      <Title name={ strMeal } />
      <FavoriteAndShare />
      <Category category={ strCategory } />
      <IngredientsList listFromProps={ ingredients } id={ id } type="meals" />
      <Instructions instructions={ strInstructions } />
      {isFinished ? (
        <Link
          to="/receitas-feitas"
          data-testid="finish-recipe-btn"
          enable
        >
          Finalizar Receita
        </Link>
      )
        : (
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled
          >
            Finalizar Receita
          </button>
        )}
    </section>
  );
}

MealRecipeInProgress.propTypes = ({
  match: PropTypes.shape(
    {
      params: PropTypes.shape(
        {
          id: PropTypes.string,
        },
      ).isRequired,
    },
  ).isRequired,
});
