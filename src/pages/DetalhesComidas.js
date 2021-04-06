import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { requestMealRecipe } from '../services/apiRequests';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import RecommendedDrinks from '../components/RecommendedDrinks';
import Loading from '../components/Loading';

function DetalhesComidas() {
  const params = useParams();
  const { id } = params;
  const [meal, setMeal] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const history = useHistory();

  const parseRecipe = (data) => {
    const aux = Object.entries(data).reduce((acc, cur) => {
      if (cur[0].startsWith('strIngredient')) {
        const both = cur[0].split('strIngredient').join('strMeasure');
        acc.push({
          ingredient: cur[1],
          measure: data[both],
        });
      }
      return acc;
    }, []);
    return aux.filter((i) => i.ingredient !== '');
  };

  useEffect(() => {
    const localStorageFavorite = localStorage.getItem('favoriteRecipes');
    if (localStorageFavorite === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    async function requestById() {
      setIsLoading(true);
      const clickedRecipe = await requestMealRecipe(id);
      setMeal(clickedRecipe[0]);
      setRecipe(parseRecipe(clickedRecipe[0]));
      setIsLoading(false);
    }
    async function verifyFavorites() {
      const favoriteRecipes = await JSON.parse(localStorage.getItem('favoriteRecipes'));
      const haveRecipe = favoriteRecipes
        .some((element) => element.id.includes(meal.idMeal));
      if (haveRecipe) return setFavorite(true);
    }
    requestById();
    verifyFavorites();
  }, [id, setIsLoading, meal.idMeal]);

  async function addToFavorite() {
    setFavorite(!favorite);
    const favoriteRecipes = await JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteRecipe = {
      id: meal.idMeal,
      type: 'comida',
      area: meal.strArea,
      category: meal.strCategory,
      alcoholicOrNot: '',
      name: meal.strMeal,
      image: meal.strMealThumb,
    };
    favoriteRecipes.push(favoriteRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }

  async function removeFromFavorite() {
    setFavorite(!favorite);
    const favoriteRecipes = await JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newList = favoriteRecipes.filter((element) => element.id !== meal.idMeal);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
  }

  return (
    <main>
      {
        isLoading
          ? <Loading />
          : (
            <div className="details-container">
              <h1 className="title" data-testid="recipe-title">{meal.strMeal}</h1>
              <img
                className="card-image"
                src={ meal.strMealThumb }
                alt="imagem"
                data-testid="recipe-photo"
              />
              <br />
              <div className="share-favorite-btn">
                <CopyToClipboard
                  text={ window.location.href }
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
                { meal.strCategory }
              </p>
              <ul className="ul-ingredients">
                <h4>Ingredients: </h4>
                { recipe.map((item, index) => (
                  <li
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ index }
                  >
                    <span>{ `${item.measure} ${item.ingredient}` }</span>
                  </li>
                ))}
              </ul>
              <p className="recipe-instructions" data-testid="instructions">
                { meal.strInstructions }
              </p>
              <video src={ meal.strYoutube } data-testid="video" controls>
                <track kind="captions" />
              </video>
              <RecommendedDrinks />
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="start"
                onClick={ () => history.push(`/comidas/${meal.idMeal}/in-progress`) }
              >
                Iniciar Receita
              </button>
            </div>
          )
      }
    </main>
  );
}

export default DetalhesComidas;
