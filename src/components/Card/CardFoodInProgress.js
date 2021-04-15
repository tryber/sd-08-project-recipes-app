import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import FoodContext from '../../context/comidaContext/FoodContext';
import { setLocalStorageDoneRecipesFoods } from '../../services/LocalStorage';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import '../../index.css';

function copyToClipboard(id, callback) {
  navigator.clipboard.writeText(`http://localhost:3000/comidas/${id}`);
  callback(true);
}

// function mealProgress(index) {
//   const checkedbox = JSON.parse(localStorage.getItem('checkedItems'));
//   const checkedboxStorage = Object.keys(checkedbox).some((id) => id === idDaReceita);
//   if (checkedboxStorage) {
//     const data = checkedbox[idDaReceita];
//   } else {
//   }
// }

function favorite(isFavorited, callback, item) {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (isFavorited) {
    const newFavorites = favorites
      .filter((foodOrDrink) => foodOrDrink.id !== item.idMeal);
    callback(false);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  } else {
    const newFavorites = [...favorites, {
      id: item.idMeal,
      type: 'comida',
      area: item.strArea,
      category: item.strCategory,
      alcoholicOrNot: '',
      name: item.strMeal,
      image: item.strMealThumb,
    }];
    callback(true);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  }
}

function CardFoodInProgress({ alreadyFavorited, idDaReceita }) {
  const {
    values: {
      detailFoods,
    },
    functions: {
      setDoneRecipe,
    },
  } = useContext(FoodContext);
  const date = new Date().toLocaleDateString();

  const [redirect, setRedirect] = useState(false);

  const handleClick = () => {
    setLocalStorageDoneRecipesFoods(detailFoods, date);
    setDoneRecipe(detailFoods.strMeal);
    setRedirect(true);
  };

  const [disableButton, setDisableButton] = useState(true);

  let checkButton = 0;
  let ingredientList = 0;

  const disabledButton = () => {
    if (checkButton === ingredientList) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  const LAST_INGREDIENT = 20;
  const ingredientIndex = [];
  for (let index = 0; index < LAST_INGREDIENT; index += 1) {
    ingredientIndex.push(index);
  }

  // const checkedbox = JSON.parse(localStorage.getItem('checkedItems'));
  // const checkedboxStorage = Object.keys(checkedbox).some((id) => id === idDaReceita);
  // let data = [];
  // if (checkedboxStorage) {
  //   data = checkedbox[idDaReceita];
  // } else {
  //   for (let index = 0; index < LAST_INGREDIENT; index += 1) {
  //     data.push(false);
  //   }
  //   const obj = { [idDaReceita]: data };
  //   localStorage.setItem('checkedItems', { ...checkedbox, ...obj });
  // }

  const handleCheckedBox = (event) => {
    const { parentNode } = event.target;
    const { checked } = event.target;
    if (checked) {
      parentNode.className = 'checkedBox-true';
      checkButton += 1;
      // data[index] = true;
      // const obj = { [idDaReceita]: data };
      // localStorage.setItem('checkedItems', { ...checkedbox, ...obj });
    } else {
      parentNode.className = 'checkedBox-false';
      checkButton -= 1;
      // data[index] = false;
      // const obj = { [idDaReceita]: data };
      // localStorage.setItem('checkedItems', { ...checkedbox, ...obj });
    }
    disabledButton();
  };

  const [isCopied, setIsCopied] = useState(false);
  const [favorited, setFavorited] = useState(alreadyFavorited);

  if (redirect) return <Redirect to="/receitas-feitas" />;

  return (
    <section>
      {detailFoods.map((item) => (
        <div key={ item.strMeal } className="imageDetails">
          <img
            src={ item.strMealThumb }
            alt={ item.strMeal }
            data-testid="recipe-photo"
          />
          <h3 data-testid="recipe-title">{item.strMeal}</h3>
          <input
            type="image"
            data-testid="share-btn"
            onClick={ () => { copyToClipboard(idDaReceita, setIsCopied); } }
            src={ shareIcon }
            alt="share"
          />
          {isCopied && <p>Link copiado!</p>}
          <input
            type="image"
            data-testid="favorite-btn"
            onClick={ () => { favorite(favorited, setFavorited, item); } }
            src={ (favorited) ? blackHeartIcon : whiteHeartIcon }
            alt="share"
          />
          <p data-testid="recipe-category">{item.strCategory}</p>
          <ul className="checkbox-list">
            {ingredientIndex.map((index) => {
              const srt = `${item[`strMeasure${index + 1}`]}`;
              if (srt === 'null' || srt === '' || srt === ' ') return '';
              ingredientList += 1;
              return (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-step` }
                  className="checkedBox-false"
                >
                  <input
                    type="checkbox"
                    // id={ `${item.idMeal}-${index}` }
                    key={ index }
                    value={ item[`strMeasure${index + 1}`] }
                    onClick={ handleCheckedBox }
                    // checked={ data[index] }
                  />
                  {`${item[`strMeasure${index + 1}`]}`
                  + ` ${item[`strIngredient${index + 1}`]}`}
                </li>
              );
            })}
          </ul>
          <p data-testid="instructions">{item.strInstructions}</p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            className="page-buttons finalizar-receita"
            disabled={ disableButton }
            onClick={ () => handleClick() }
          >
            Finalizar Receita
          </button>
        </div>
      ))}
    </section>
  );
}

CardFoodInProgress.propTypes = {
  alreadyFavorited: PropTypes.bool.isRequired,
  idDaReceita: PropTypes.string.isRequired,
};

export default CardFoodInProgress;
