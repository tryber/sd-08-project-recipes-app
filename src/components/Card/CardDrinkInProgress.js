import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import DrinkContext from '../../context/bebidaContext/DrinkContext';
import { setLocalStorageDoneRecipesDrinks } from '../../services/LocalStorage';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import '../../index.css';

function copyToClipboard(id, callback) {
  navigator.clipboard.writeText(`http://localhost:3000/bebidas/${id}`);
  callback(true);
}

function favorite(isFavorited, callback, item) {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (isFavorited) {
    const newFavorites = favorites
      .filter((foodOrDrink) => foodOrDrink.id !== item.idDrink);
    callback(false);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  } else {
    const newFavorites = [...favorites, {
      id: item.idDrink,
      type: 'bebida',
      area: '',
      category: item.strCategory,
      alcoholicOrNot: item.strAlcoholic,
      name: item.strDrink,
      image: item.strDrinkThumb,
    }];
    callback(true);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  }
}

function CardDrinkInProgress({ alreadyFavorited, idDaReceita }) {
  const {
    values: {
      detailDrinks,
    },
    functions: {
      setDoneRecipe,
    },
  } = useContext(DrinkContext);

  console.log(detailDrinks);
  const date = new Date().toLocaleDateString();

  const [redirect, setRedirect] = useState(false);

  const handleClick = () => {
    setLocalStorageDoneRecipesDrinks(detailDrinks, date);
    setDoneRecipe(detailDrinks.strDrink);
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

  const LAST_INGREDIENT = 15;
  const ingredientIndex = [];
  for (let index = 0; index < LAST_INGREDIENT; index += 1) {
    ingredientIndex.push(index);
  }

  const handleCheckedBox = (event) => {
    const { parentNode } = event.target;
    const { checked } = event.target;
    if (checked) {
      parentNode.className = 'checkedBox-true';
      checkButton += 1;
    } else {
      parentNode.className = 'checkedBox-false';
      checkButton -= 1;
    }
    disabledButton();
  };

  const [isCopied, setIsCopied] = useState(false);
  const [favorited, setFavorited] = useState(alreadyFavorited);

  if (redirect) return <Redirect to="/receitas-feitas" />;

  return (
    <section>
      {detailDrinks.map((item) => (
        <div key={ item.strDrink } className="imageDetails">
          <img
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
            data-testid="recipe-photo"
          />
          <h3 data-testid="recipe-title">{item.strDrink}</h3>
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
          <p data-testid="recipe-category">{item.strAlcoholic}</p>
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

CardDrinkInProgress.propTypes = {
  alreadyFavorited: PropTypes.bool.isRequired,
  idDaReceita: PropTypes.string.isRequired,
};

export default CardDrinkInProgress;
