import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../context/Context';

import '../styles/RecipeList.css';

const FIRST_TWELVE_RECIPES = 12;

function RecipeList({ route, recipeType }) {
  const {
    isFetching,
    apiReturn,
  } = useContext(Context);

  function renderNoRecipeMessage() {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return <p>Nenhuma Receita Encontrada</p>;
  }

  function renderRecipeList() {
    const recipes = Object.values(apiReturn[0])[0];

    if (recipes !== null && recipes.length === 1) {
      return <Redirect to={ `/${route}/${recipes[0][`id${recipeType}`]}` } />;
    }

    return recipes
      ? (
        <section className="container-recipe-list">
          {recipes.slice(0, FIRST_TWELVE_RECIPES).map((recipe, index) => (
            <div
              className="holder"
              data-testid={ `${index}-recipe-card` }
              key={ recipe[`id${recipeType}`] }
            >
              <p data-testid={ `${index}-card-name` }>{ recipe[`str${recipeType}`] }</p>
              <img
                className="recipe-img"
                data-testid={ `${index}-card-img` }
                src={ recipe[`str${recipeType}Thumb`] }
                alt="recipe thumbnail"
              />
              <hr />
            </div>
          ))}
        </section>
      )
      : renderNoRecipeMessage();
  }

  return (
    apiReturn && (isFetching
      ? <p>Loading...</p>
      : renderRecipeList())
  );
}

export default RecipeList;
