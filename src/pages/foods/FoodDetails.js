import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import RecipesContext from '../../ContextApi/RecipesContext';

export default function FoodDetails() {
  const { history } = useContext(RecipesContext);

  const ytVideo = () => (
    history.location.pathname.includes('comidas')
      ? currentFood.map((video) => (
        <iframe
          frameBorder="0"
          data-testid="video"
          key={ video.strYoutube }
          src={ video.strYoutube.split('watch?v=').join('embed/') }
          title="recipe video"
        />
      ))
      : ''
  );

  const historyPath = () => (
    history.push(`${history.location.pathname}/FoodInProgress`)
  );

  return (
    <div>
      { currentRecipes.map((recipes) => (
        <div key={ 0 }>
          <img
            src={ recipes.strMealThumb || recipes.strDrinkThumb }
            data-testid="recipe-photo"
            // FOTO
            alt="Thumbnail"
          />
          <h1
          // TITULO
            data-testid="recipe-title"
          >
            { recipes.strMeal || recipes.strDrink }
          </h1>
          <p data-testid="share-btn">btnCompartilhar</p>
          <p data-testid="favorite-btn">btnFavorito</p>
          <h6 data-testid="recipe-category">{ recipes.strCategory }</h6>
          { recipes.strAlcoholic ? <h6>{ recipes.strAlcoholic }</h6> : null }
          <h2>Ingredientes</h2>
          <ul>
            { currentFoodIngredients.map((curr, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                { curr }
              </li>
            ))}
          </ul>
          <h2>Instruções</h2>
          <p data-testid="instructions">{ recipes.strInstructions }</p>
          <div>
            {ytVideo()}
          </div>
          <input
            type="button"
            datatestid="start-recipe-btn"
            label="Iniciar Receita"
            onClick={ historyPath }
          />
        </div>
      ))}
    </div>
  );
}
