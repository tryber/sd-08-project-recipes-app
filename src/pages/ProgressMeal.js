import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fetchMealActionId from '../redux/actions/fetchMealId';
import '../CSS/Completed.css';
import ShareButton from '../components/ShareButton';
import LikeButton from '../components/LikeButton';
import { findKey } from '../services/index';
import '../CSS/FoodDetail.css';

function ProgressMeal() {
  const { singleRecipe } = useSelector((state) => state.recipes);
  const [meatStorage, setMeatStorage] = useState([]);
  const history = useHistory();
  const arrayMeat = singleRecipe[0];
  const dispatch = useDispatch();

  const { pathname } = history.location;
  const arrayId = pathname.split('/')[2];

  useEffect(() => {
    const fetchData = (id) => dispatch(fetchMealActionId(id));
    fetchData(arrayId);
    const storage = localStorage.getItem('inProgressRecipes')
      && JSON.parse(localStorage.getItem('inProgressRecipes')).meals;
    setMeatStorage((storage && storage[arrayId]) ? storage[arrayId] : []);
  }, []);

  function saveLocalStorage(id, name) {
    const getStorage = localStorage.getItem('inProgressRecipes')
      && JSON.parse(localStorage.getItem('inProgressRecipes'));

    const localState = meatStorage.includes(name)
      ? meatStorage.filter((e) => e !== name)
      : meatStorage.concat(name);
    setMeatStorage(localState);

    const newStorage = getStorage
      ? Object.assign(getStorage, { meals: { [id]: localState } })
      : { meals: { [id]: localState } };

    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  }

  const handleChecked = ({ target }) => {
    const { parentNode } = target;
    const { checked } = target;
    if (checked) {
      parentNode.className = 'completed';
    } else {
      parentNode.className = '';
    }
  };

  const createIngrediets = () => {
    const ingredient = findKey(arrayMeat, 'strIngredient');
    const measure = findKey(arrayMeat, 'strMeasure');
    return ingredient.map((nome, index) => {
      if (nome) {
        return (
          <div key={ index } data-testid={ `${index}-ingredient-step` }>
            <label
              htmlFor={ nome }
              className={ meatStorage && meatStorage.includes(nome) ? 'completed' : '' }
            >
              <input
                type="checkbox"
                id={ nome }
                name={ nome }
                value={ nome }
                onChange={ (event) => {
                  handleChecked(event);
                  saveLocalStorage(arrayId, nome);
                } }
                checked={ meatStorage && meatStorage.includes(nome) }
              />
              {` ${nome} - ${measure[index]}`}
            </label>
          </div>
        );
      }
      return undefined;
    });
  };

  const verifyDisable = () => {
    const ingredientLength = findKey(arrayMeat, 'strIngredient').length;
    if (meatStorage && meatStorage.length === ingredientLength) {
      return false;
    }
    return true;
  };

  // const finishRecipe = () => {
  //   const doneStorage = (localStorage.getItem('doneRecipes'))
  //     ? JSON.parse(localStorage.getItem('doneRecipes'))
  //     : [];
  //   const doneRecipe = {
  //     id: arrayMeat.idMeal,
  //     type: 'comida',
  //     area: arrayMeat.strArea ? arrayMeat.strArea : '',
  //     category: arrayMeat.strCategory ? arrayMeat.strCategory : '',
  //     alcoholicOrNot: '',
  //     name: arrayMeat.strMeal,
  //     image: arrayMeat.strMealThumb,
  //     doneDate: new Date().toLocaleDateString(),
  //     tags: arrayMeat.strTags ? arrayMeat.strTags.split(',') : [],
  //   };
  //   const newStorage = [...doneStorage, doneRecipe];
  //   localStorage.setItem('doneRecipes', JSON.stringify(newStorage));
  // };

  const renderMeal = () => (
    arrayMeat !== undefined && (
      <div className="detail-main-container">
        <div className="detail-header-container">
          <img
            data-testid="recipe-photo"
            src={ arrayMeat.strMealThumb }
            alt="recipe"
            className="detail-img"
          />
          <h1
            data-testid="recipe-title"
            className="detail-title"
          >
            { arrayMeat.strMeal }
          </h1>
          <div className="buttons-container">
            <ShareButton recipeId={ arrayMeat.idMeal } recipeType="comida" />
            <LikeButton />
          </div>
        </div>
        <div className="detail-info">
          <p data-testid="recipe-category">{arrayMeat.strCategory}</p>

          <span className="detail-subtitle">Ingredients:</span>
          <div className="detail-ingredients">
            { createIngrediets() }
          </div>

          <span className="detail-subtitle">Instructions:</span>
          <div className="detail-ingredients">
            <p data-testid="instructions">{arrayMeat.strInstructions}</p>
          </div>
        </div>
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ verifyDisable() }
          onClick={ () => {
            // finishRecipe();
            history.push('/receitas-feitas');
          } }
          className="regular-button beginRecipe-btn"
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

// [{
//     id: id-da-receita,
//     type: comida-ou-bebida,
//     area: area-da-receita-ou-texto-vazio,
//     category: categoria-da-receita-ou-texto-vazio,
//     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//     name: nome-da-receita,
//     image: imagem-da-receita,
//     doneDate: quando-a-receita-foi-concluida,
//     tags: array-de-tags-da-receita-ou-array-vazio
// }]
