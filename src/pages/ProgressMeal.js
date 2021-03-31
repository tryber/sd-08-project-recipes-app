import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchMealActionId from '../redux/actions/fetchMealId';
import '../CSS/Completed.css';

function ProgressMeal() {
  const meat = useSelector((state) => state.recipes.singleRecipe);

  const arrayMeat = meat[0];
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const arrayId = pathname.split('/')[2];

  useEffect(() => {
    const fetchData = (id) => dispatch(fetchMealActionId(id));

    fetchData(arrayId);
  }, []);

  const findKey = (value) => Object.entries(arrayMeat).map((nome) => {
    if (nome[0].includes(value)) {
      return nome[1];
    }
    return undefined;
  }).filter((element) => element !== undefined);

  const handleChecked = (event) => {
    const { parentNode } = event.target;
    const { checked } = event.target;
    if (checked) {
      parentNode.childNodes[1].className = 'completed';
    } else {
      parentNode.childNodes[1].className = '';
    }
  };

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
              value={ nome }
              onClick={ handleChecked }
            />
            <label
              htmlFor={ nome }
            >
              {`${nome} - ${measure[index]}`}
            </label>
          </div>
        );
      }
      return undefined;
    });
  };

  const renderMeal = () => (
    arrayMeat !== undefined && (
      <div>
        <img data-testid="recipe-photo" src={ arrayMeat.strMealThumb } alt="recipe" />
        <h1 data-testid="recipe-title">{arrayMeat.strMeal}</h1>
        <button type="button" data-testid="share-btn">
          <img src={ shareIcon } alt="share icon" />
        </button>
        <button type="button" data-testid="favorite-btn">
          <img src={ whiteHeartIcon } alt="favorite" />
        </button>

        <p data-testid="recipe-category">{arrayMeat.strCategory}</p>

        Ingredients
        {createIngrediets()}

        Instructions
        <p data-testid="instructions">{arrayMeat.strInstructions}</p>

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
      {renderMeal()}
    </div>
  );
}

export default ProgressMeal;
