import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../../context/Context';
import Recommendations from '../../component/Recommendations';
import { FavoriteButton, ShareDisplay } from '../../component';
import StyledProgress from '../../styles/RecipesInProgress';

const ONE_DIGIT = 10;

const date = new Date();
const YEAR = date.getFullYear();
const MONTH = date.getMonth() < ONE_DIGIT ? `0${date.getMonth()}` : date.getMonth();
const DAY = date.getDay() < ONE_DIGIT ? `0${date.getDay()}` : date.getDay();

export default function DrinkInProgress({
  match: {
    params: { id },
  },
}) {
  const { recipeDetail, setSearchParams } = useContext(Context);
  const history = useHistory();
  const [recipe, setRecipe] = useState();
  const [hasIngredient, setHasIngredient] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes')),
  );

  useEffect(() => {
    setSearchParams({
      searchInput: id,
      selectedParameter: 'recipe',
      location: history.location.pathname,
    });
  }, [setSearchParams, history.location.pathname, id]);

  useEffect(() => setRecipe(...recipeDetail), [recipeDetail]);

  if (!recipe) return <div>Carregando...</div>;

  const { strDrinkThumb, strDrink, strCategory, strInstructions, strAlcoholic } = recipe;

  const ingredients = Object.keys(recipe)
    .filter((prop) => prop.includes('strIngredient'))
    .map((ingredient) => recipe[ingredient])
    .filter((ingredient) => ingredient);

  const measures = Object.keys(recipe)
    .filter((prop) => prop.includes('strMeasure'))
    .map((measure) => recipe[measure])
    .filter((measure) => measure);

  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    const inProgressRecipes = { cocktails: { [id]: [] }, meals: {} };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }

  const handleChange = (ingredient) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { cocktails } = inProgressRecipes;

    if (!cocktails[id]) {
      const newInProgressRecipes = {
        ...inProgressRecipes,
        cocktails: {
          [id]: [ingredient],
        },
      };
      setHasIngredient([ingredient]);
      return localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify(newInProgressRecipes),
      );
    }

    const newIngredients = cocktails[id].includes(ingredient)
      ? cocktails[id].filter((item) => item !== ingredient)
      : [...cocktails[id], ingredient];

    const newInProgressRecipes = {
      ...inProgressRecipes,
      cocktails: {
        ...cocktails,
        [id]: newIngredients,
      },
    };

    setHasIngredient(newInProgressRecipes);
    return localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(newInProgressRecipes),
    );
  };

  const handleCheck = (ingredient) => {
    if (hasIngredient && hasIngredient.cocktails && hasIngredient.cocktails[id]) {
      return hasIngredient.cocktails[id].includes(ingredient);
    }
    return false;
  };

  const goTo = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const doneDate = `${DAY}/${MONTH}/${YEAR}`;
    const recipeInfo = {
      id,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate,
      tags: [],
    };
    if (!doneRecipes.some((r) => r.name === recipeInfo.name)) {
      const newDoneRecipes = [...doneRecipes, recipeInfo];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    }
    history.push('/receitas-feitas');
  };

  const handleDisable = () => !ingredients.every((ingredient) => handleCheck(ingredient));

  return (
    <StyledProgress>
      <img data-testid="recipe-photo" src={ strDrinkThumb } alt="Recipe Done" />
      <h1 data-testid="recipe-title">{strDrink}</h1>
      <div className="interaction-btns">
        <FavoriteButton
          recipeInfo={ {
            id,
            type: 'bebida',
            area: '',
            category: strCategory,
            alcoholicOrNot: strAlcoholic,
            name: strDrink,
            image: strDrinkThumb,
          } }
        />
        <ShareDisplay url={ history.location.pathname.replace('/in-progress', '') } />
      </div>
      <h5 data-testid="recipe-category">{`${strCategory} ${strAlcoholic}`}</h5>
      <div className="ingredient">
        {ingredients.map((ingredient, index) => (
          <div key={ index } data-testid={ `${index}-ingredient-step` }>
            <label htmlFor={ ingredient }>
              <input
                type="checkbox"
                id={ ingredient }
                checked={ handleCheck(ingredient) }
                onChange={ () => handleChange(ingredient) }
              />
              {`-${ingredient} - ${measures[index]}`}
            </label>
          </div>
        ))}
      </div>
      <p data-testid="instructions" className="instructions">
        {strInstructions}
      </p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ goTo }
        disabled={ handleDisable() }
        className="finish-btn"
      >
        Finalizar Receita
      </button>
      <Recommendations />
    </StyledProgress>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
