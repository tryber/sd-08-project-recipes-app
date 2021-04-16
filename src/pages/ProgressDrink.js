import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LikeButton from '../components/LikeButton';
import ShareButton from '../components/ShareButton';
import fetchDrinkActionId from '../redux/actions/fetchDrink';
import '../CSS/Completed.css';
import { findKey } from '../services/index';
import '../CSS/FoodDetail.css';

function ProgressDrink() {
  const { singleRecipe } = useSelector((state) => state.recipes);
  const [cocktailStorage, setCocktailStorage] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const { pathname } = history.location;
  const arrayId = pathname.split('/')[2];

  const arrayDrink = singleRecipe[0];

  useEffect(() => {
    const fetchData = ((id) => dispatch(fetchDrinkActionId(id)));
    fetchData(arrayId);
    const storage = localStorage.getItem('inProgressRecipes')
      && JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails;
    setCocktailStorage((storage && storage[arrayId]) ? storage[arrayId] : []);
  }, []);

  function saveLocalStorage(id, name) {
    const getStorage = localStorage.getItem('inProgressRecipes')
      && JSON.parse(localStorage.getItem('inProgressRecipes'));

    const localState = cocktailStorage.includes(name)
      ? cocktailStorage.filter((e) => e !== name)
      : cocktailStorage.concat(name);
    setCocktailStorage(localState);

    const newStorage = getStorage
      ? Object.assign(getStorage, { cocktails: { [id]: localState } })
      : { cocktails: { [id]: localState } };

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
    const ingredient = findKey(arrayDrink, 'strIngredient');
    const measure = findKey(arrayDrink, 'strMeasure');

    return ingredient.map((nome, index) => {
      if (nome) {
        return (
          <div key={ index } data-testid={ `${index}-ingredient-step` }>
            <label
              htmlFor={ nome }
              className={ cocktailStorage && cocktailStorage.includes(nome)
                ? 'completed' : '' }
            >
              <input
                type="checkbox"
                id={ nome }
                name={ nome }
                onChange={ (event) => {
                  saveLocalStorage(arrayId, nome);
                  handleChecked(event);
                } }
                checked={ cocktailStorage && cocktailStorage.includes(nome) }
              />
              {`${nome} - ${measure[index]}`}
            </label>
          </div>
        );
      }
      return undefined;
    });
  };

  const verifyDisable = () => {
    const ingredientLength = findKey(arrayDrink, 'strIngredient').length;
    if (cocktailStorage && cocktailStorage.length === ingredientLength) {
      return false;
    }
    return true;
  };

  // const finishRecipe = () => {
  //   const doneStorage = (localStorage.getItem('doneRecipes'))
  //     ? JSON.parse(localStorage.getItem('doneRecipes'))
  //     : [];
  //   const doneRecipe = {
  //     id: arrayDrink.idDrink,
  //     type: 'bebida',
  //     area: arrayDrink.strArea ? arrayDrink.strArea : '',
  //     category: arrayDrink.strCategory ? arrayDrink.strCategory : '',
  //     alcoholicOrNot: arrayDrink.strAlcoholic ? arrayDrink.strAlcoholic : '',
  //     name: arrayDrink.strDrink,
  //     image: arrayDrink.strDrinkThumb,
  //     doneDate: new Date().toLocaleDateString(),
  //     tags: arrayDrink.strTags ? arrayDrink.strTags.split(',') : [],
  //   };
  //   const newStorage = [...doneStorage, doneRecipe];
  //   localStorage.setItem('doneRecipes', JSON.stringify(newStorage));
  // };

  const renderDrink = () => (
    arrayDrink !== undefined && (
      <div className="detail-main-container">
        <div className="detail-header-container">
          <img
            data-testid="recipe-photo"
            src={ arrayDrink.strDrinkThumb }
            alt="recipe"
            className="detail-img"
          />
          <h1
            data-testid="recipe-title"
            className="detail-title"
          >
            { arrayDrink.strDrink }
          </h1>
          <div className="buttons-container">
            <ShareButton
              recipeId={ arrayDrink.idDrink }
              recipeType="bebida"
            />
            <LikeButton />
          </div>
        </div>
        <div className="detail-info">
          <p data-testid="recipe-category">{arrayDrink.strAlcoholic}</p>
          <p data-testid="recipe-category">{arrayDrink.strCategory}</p>
          <span className="detail-subtitle">Ingredients:</span>
          <div className="detail-ingredients">
            {createIngrediets()}
          </div>

          <span className="detail-subtitle">Instructions:</span>
          <div className="detail-ingredients">
            <p data-testid="instructions">{ arrayDrink.strInstructions }</p>
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
    <div className="detail-main-section">
      {renderDrink()}
    </div>
  );
}

export default ProgressDrink;
