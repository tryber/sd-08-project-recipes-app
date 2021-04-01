import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchDrinkActionId from '../redux/actions/fetchDrink';

function ProgressDrink() {
  const drink = useSelector((state) => state.recipes.singleRecipe);

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const arrayId = pathname.split('/')[2];

  const arrayDrink = drink[0];
  console.log(arrayDrink);

  useEffect(() => {
    const fetchData = ((id) => dispatch(fetchDrinkActionId(id)));
    fetchData(arrayId);
  }, []);

  const findKey = (value) => Object.entries(arrayDrink).map((nome) => {
    if (nome[0].includes(value)) {
      return nome[1];
    }
    return undefined;
  }).filter((element) => element !== undefined);

  const createIngrediets = () => {
    const ingredient = findKey('strIngredient');
    const measure = findKey('strMeasure');

    return ingredient.map((nome, index) => {
      if (nome) {
        return (
          <div key={ index } data-testid={ `${index}-ingredient-step` }>
            <input
              type="checkbox"
              id={ nome }
              name={ nome }

            />
            <label htmlFor={ nome }>{`${nome} - ${measure[index]}`}</label>
          </div>
        );
      }
      return undefined;
    });
  };

  const renderDrink = () => (
    arrayDrink !== undefined && (
      <div>
        <img data-testid="recipe-photo" src={ arrayDrink.strDrinkThumb } alt="recipe" />
        <h1 data-testid="recipe-title">{arrayDrink.strDrink}</h1>
        <button type="button" data-testid="share-btn">
          <img src={ shareIcon } alt="share icon" />
        </button>
        <button type="button" data-testid="favorite-btn">
          <img src={ whiteHeartIcon } alt="favorite" />
        </button>
        <p data-testid="recipe-category">{arrayDrink.strAlcoholic}</p>
        <p data-testid="recipe-category">{arrayDrink.strCategory}</p>
        Ingredients
        {createIngrediets()}

        Instructions
        <p data-testid="instructions">{arrayDrink.strInstructions}</p>

        <button
          data-testid="finish-recipe-btn"
          type="button"
        >
          Finalizar Receita
        </button>
      </div>
    ));

  return (
    <div>
      {renderDrink()}
    </div>
  );
}

export default ProgressDrink;
