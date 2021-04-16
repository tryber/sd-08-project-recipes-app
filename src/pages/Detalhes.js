import React, { useEffect, useState, useContext } from 'react';

import { useLocation, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import LariContext from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RecomandationCard from '../components/RecomandationCard';
import { getDoneRecipes, inProgressRecipes } from '../utils';

import { fetchProductDetailsById } from '../services';

// const saveFavoriteRecipes = (isMeal, foodDetails) => {
//   let results = {};
//   if (isMeal) {
//     results = {
//       id: foodDetails.idMeal,
//       type: 'comida',
//       area: foodDetails.strArea,
//       category: foodDetails.strCategory,
//       alcoholicOrNot: '',
//       name: foodDetails.strMeal,
//       image: foodDetails.strMealThumb,
//     };
//   } else {
//     results = {
//       id: foodDetails.idDrink,
//       type: 'bebida',
//       area: '',
//       category: foodDetails.strCategory,
//       alcoholicOrNot: foodDetails.strAlcoholic,
//       name: foodDetails.strDrink,
//       image: foodDetails.strDrinkThumb,
//     };
//   }
//   return results;
//   // setFavoriteRecipe(results);
// };
// const handleIsFavorite = (favorite, isMeal, foodDetails, setIsFavorite) => {
//   // const [,, id] = location.pathname.split('/');
//   const favoriteRecipe = saveFavoriteRecipes(isMeal, foodDetails);
//   localStorage.setItem('isFavorite', favorite);
//   setIsFavorite(favorite);
//   const recipeFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
//   let result = '';
//   if (favorite) {
//     result = [...recipeFavorite, favoriteRecipe];
//   } else if (isMeal) {
//     result = recipeFavorite.filter((recipe) => recipe.id !== foodDetails.idMeal);
//   } else {
//     result = recipeFavorite.filter((recipe) => recipe.id !== foodDetails.idDrink);
//   }
//   localStorage.setItem('favoriteRecipes', JSON.stringify(result));
// };

const Detalhes = () => {
  const [ingredients, setIngredients] = useState([]);
  const [buttonRecipe, setButtonRecipe] = useState(true);
  const [inProgress, setProgress] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { isFavorite, setIsFavorite, isMeal, setIsMeal, foodDetails,
    setFoodDetails, handleIsFavorite } = useContext(LariContext);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const doneRecipes = getDoneRecipes();
    const [,, id] = location.pathname.split('/');
    const isDone = doneRecipes.some((recipe) => recipe.id === id);
    setButtonRecipe(!isDone);
  }, [location.pathname]);

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const [,, id] = location.pathname.split('/');
    setIsFavorite(fav.some((result) => result.id === id));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const [, type, id] = location.pathname.split('/');
      const productType = { comidas: 'meals', bebidas: 'drinks' };

      const foodDetailRequest = await fetchProductDetailsById(id, type);
      const foodDetail = foodDetailRequest[productType[type]][0];

      const ingredientFilter = Object
        .keys(foodDetail).filter(
          (key) => key.includes('strIngredient') && foodDetail[key],
        );

      setIsMeal(type === 'comidas');
      setFoodDetails(foodDetail);
      setIngredients(ingredientFilter);
    };

    fetchData();
  }, [location.pathname]);

  useEffect(() => {
    const fetchInProgress = async () => {
      const inProgres = await inProgressRecipes(isMeal);
      const [,, id] = location.pathname.split('/');
      if (!inProgres) return;
      setProgress(!!inProgres[id]);
    };
    fetchInProgress();
  }, [location.pathname, isMeal]);

  if (!Object.keys(foodDetails).length) return <h2>Loading...</h2>;

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ isMeal ? foodDetails.strMealThumb : foodDetails.strDrinkThumb }
        alt={ foodDetails.strMeal }
        width="300px"
      />
      <h2 data-testid="recipe-title">
        {isMeal ? foodDetails.strMeal : foodDetails.strDrink}
      </h2>
      <h3 data-testid="recipe-category">
        { isMeal ? foodDetails.strCategory : foodDetails.strAlcoholic}
      </h3>
      <input
        type="image"
        onClick={ async () => {
          const ONE_SECOND = 1000;
          await copy(window.location.href);
          setHidden(true);
          setTimeout(() => setHidden(false), ONE_SECOND);
        } }
        data-testid="share-btn"
        src={ shareIcon }
        alt="Share"
      />

      <span hidden={ !hidden }>Link copiado!</span>
      <input
        type="image"
        data-testid="favorite-btn"
        onClick={
          () => handleIsFavorite(!isFavorite)
        }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Favorite"
      />
      {
        ingredients.map((ingredient, index) => {
          const ingredientName = foodDetails[ingredient];
          const ingMeasure = foodDetails[ingredient.replace('Ingredient', 'Measure')];

          return (
            <p key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${ingredientName} - ${ingMeasure}`}
            </p>
          );
        })
      }
      <p data-testid="instructions">{foodDetails.strInstructions}</p>

      {foodDetails.strYoutube && <iframe
        src={ `https://www.youtube.com/embed/${foodDetails.strYoutube.split('v=')[1]}` }
        frameBorder="0"
        allowFullScreen
        title="video"
        data-testid="video"
      />}

      <RecomandationCard type={ isMeal ? 'comidas' : 'bebidas' } />

      {buttonRecipe && (
        <button
          onClick={ () => {
            history.push(`${location.pathname}/in-progress`, foodDetails);
          } }
          type="button"
          className="btnStyle"
          data-testid="start-recipe-btn"
        >
          { inProgress ? 'Continuar Receita' : 'Iniciar Receita'}

        </button>)}
    </div>
  );
};
export default Detalhes;
