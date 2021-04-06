import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { requestDrinkRecipe } from '../services/apiRequests';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Loading from '../components/Loading';

function EmProgresso() {
  const params = useParams();
  const { id } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [drink, setDrink] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [checkBoxCounter, setCheckBoxCounter] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();
  const MAX_LENGTH_DRINK_URL = 36;
  const MAX_LENGTH_INGREDIENTS = 3;

  function parseIngredients(data) {
    const arrayIngredients = Object.keys(data);
    const element = arrayIngredients.filter((item) => item.includes('strIngredient'));
    const test = element.filter((item) => data[item]);
    console.log('teste', test);

    setIngredients(test);
    setIsLoading(false);
  }

  useEffect(() => {
    if (checkBoxCounter === MAX_LENGTH_INGREDIENTS) return setIsDisabled(false);
    setIsDisabled(true);
    async function requestById() {
      // setIsLoading(true);
      const clickedRecipe = await requestDrinkRecipe(id);
      setDrink(clickedRecipe[0]);
      parseIngredients(clickedRecipe[0]);
    }
    async function verifyFavorites() {
      const favoriteRecipes = await JSON.parse(localStorage.getItem('favoriteRecipes'));
      const haveRecipe = favoriteRecipes
        .some((element) => element.id.includes(drink.idDrink));
      if (haveRecipe) return setFavorite(true);
    }
    requestById();
    verifyFavorites();
  }, [id, drink.idDrink, checkBoxCounter]);

  async function addToFavorite() {
    setFavorite(!favorite);
    const favoriteRecipes = await JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteRecipe = {
      id: drink.idDrink,
      type: 'bebida',
      area: drink.strArea,
      category: drink.strCategory,
      alcoholicOrNot: drink.strAlcoholic,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
    };
    favoriteRecipes.push(favoriteRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }

  async function removeFromFavorite() {
    setFavorite(!favorite);
    const favoriteRecipes = await JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newList = favoriteRecipes.filter((element) => element.id !== drink.idDrink);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
  }

  function handleCheckBox({ target }) {
    if (target.checked) {
      setCheckBoxCounter(checkBoxCounter + 1);
      target.parentNode.className = 'riscado';
      return;
    }
    target.parentNode.className = 'normal';
    setCheckBoxCounter(checkBoxCounter - 1);
  }

  return (
    <main>
      {
        isLoading
          ? <Loading />
          : (
            <div className="details-container">
              <h1 className="title" data-testid="recipe-title">{drink.strDrink}</h1>
              <img
                className="card-image"
                src={ drink.strDrinkThumb }
                alt="imagem"
                data-testid="recipe-photo"
              />
              <br />
              <div className="share-favorite-btn">
                <CopyToClipboard
                  text={ (window.location.href).slice(0, MAX_LENGTH_DRINK_URL) }
                  onCopy={ () => setCopied(true) }
                >
                  <input
                    data-testid="share-btn"
                    type="image"
                    src={ shareIcon }
                    alt="button share with friends"
                  />
                </CopyToClipboard>
                {copied ? <span style={ { color: 'red' } }>Link copiado!</span> : null}
                {
                  favorite
                    ? (
                      <input
                        type="image"
                        src={ blackHeartIcon }
                        data-testid="favorite-btn"
                        alt="favorite btn"
                        onClick={ removeFromFavorite }
                      />
                    )
                    : (
                      <input
                        type="image"
                        src={ whiteHeartIcon }
                        data-testid="favorite-btn"
                        alt="favorite btn"
                        onClick={ addToFavorite }
                      />
                    )
                }
              </div>
              <p data-testid="recipe-category">
                { drink.strCategory }
              </p>
              <ul className="ul-ingredients">
                <h4>Ingredients: </h4>
                { ingredients.map((item, index) => (
                  <li
                    data-testid={ `${index}-ingredient-step` }
                    key={ index }
                  >
                    <label htmlFor={ index }>
                      <input type="checkbox" id={ index } onClick={ handleCheckBox } />
                      { `${drink[item]}` }
                    </label>
                    {/* <span>{ `${meal[item]}` }</span> */}
                  </li>
                ))}
              </ul>
              <p className="recipe-instructions" data-testid="instructions">
                { drink.strInstructions }
              </p>
              <button
                type="button"
                data-testid="finish-recipe-btn"
                disabled={ isDisabled }
                onClick={ () => history.push('/receitas-feitas') }
                className="start"
              >
                Finalizar receita
              </button>
            </div>
          )
      }
    </main>
  );
}

export default EmProgresso;
