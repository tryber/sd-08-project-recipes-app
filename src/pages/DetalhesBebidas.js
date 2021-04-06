import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import RecommendedMeals from '../components/RecommendedMeals';
import { requestDrinkRecipe } from '../services/apiRequests';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Context from '../context/Context';
import Loading from '../components/Loading';

function DetalhesBebidas() {
  const { isLoading, setIsLoading } = useContext(Context);
  const [drink, setDrink] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const history = useHistory();
  const params = useParams();
  const { id } = params;

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
    return aux.filter((i) => i.ingredient !== null);
  };

  useEffect(() => {
    const localStorageFavorite = localStorage.getItem('favoriteRecipes');
    if (localStorageFavorite === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    async function requestById() {
      setIsLoading(true);
      const clickedRecipe = await requestDrinkRecipe(id);
      setDrink(clickedRecipe[0]);
      setRecipe(parseRecipe(clickedRecipe[0]));
      setIsLoading(false);
    }
    async function verifyFavorites() {
      const favoriteRecipes = await JSON.parse(localStorage.getItem('favoriteRecipes'));
      const haveRecipe = favoriteRecipes
        .some((element) => element.id.includes(drink.idDrink));
      if (haveRecipe) return setFavorite(true);
    }
    requestById();
    verifyFavorites();
  }, [id, drink.idDrink, setIsLoading]);

  async function addToFavorite() {
    setFavorite(!favorite);
    const favoriteRecipes = await JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteRecipe = {
      id: drink.idDrink,
      type: 'bebida',
      area: '',
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
                { drink.strAlcoholic }
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
                { drink.strInstructions }
              </p>
              <video src={ drink.strYoutube } data-testid="video" controls>
                <track kind="captions" />
              </video>
              <RecommendedMeals />
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="start"
                onClick={ () => history.push(`/bebidas/${drink.idDrink}/in-progress`) }
              >
                Iniciar Receita
              </button>
            </div>
          )
      }
    </main>
  );
}

export default DetalhesBebidas;
