import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { fetchProductDetailsById } from '../services';
import LariContext from '../context/Context';

const handleInProgress = (idCurrentRecipe, isFood, setInProgress, setUseIngri) => {
  if (localStorage.getItem('inProgressRecipes') === null) {
    const recipesInProgress = {
      cocktails: {},
      meals: {},
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
    setUseIngri([]);
  } else {
    const storageProgessRecipes = (
      JSON.parse(localStorage.getItem('inProgressRecipes')));
    setInProgress(storageProgessRecipes);
    if (isFood) {
      const result = Object.keys(storageProgessRecipes.meals).indexOf(idCurrentRecipe);
      if (result >= 0) {
        console.log(result, 'ingrediente');
        setUseIngri(storageProgessRecipes.meals[idCurrentRecipe]);
      } else {
        setUseIngri([]);
      }
    } else {
      const result = Object.keys(storageProgessRecipes.cocktails)
        .indexOf(idCurrentRecipe);
      if (result >= 0) {
        setUseIngri(storageProgessRecipes.cocktails[idCurrentRecipe]);
      } else {
        setUseIngri([]);
      }
    }
  }
};

const creatLocalObj = (usedIngridients,
  inProgress = { meals: {}, cocktails: {} }, foodDetails = { idMeal: '' }, isMeal) => {
  let result = { ...inProgress };

  if (!isMeal) {
    result = {
      cocktails: { ...inProgress.cocktails,
        [foodDetails.idDrink]: [...usedIngridients] },
      meals: { ...inProgress.meals },
    };
    // result.cocktails[foodDetails.idDrink] = [...usedIngridients];
  } else {
    result = {
      meals: { ...inProgress.meals,
        [foodDetails.idMeal]: [...usedIngridients] },
      cocktails: { ...inProgress.cocktails },
    };
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(result));
};

function handleCheckBox(name,
  inProgress, foodDetail, ObjUsedIngri = { obj: [], fun: () => {}, isMeal: true }) {
  console.log(name, inProgress, foodDetail);
  const usedIngriObj = ObjUsedIngri.obj;
  const FunUsedIngri = ObjUsedIngri.fun;
  const isFood = ObjUsedIngri.isMeal;
  let usedIngredients = [...usedIngriObj];
  const index = usedIngredients.indexOf(name);
  if (index >= 0) {
    usedIngredients.splice(index, 1);
  } else {
    usedIngredients = [...usedIngredients, name];
  }
  FunUsedIngri(usedIngredients);
  creatLocalObj(usedIngredients, inProgress, foodDetail, isFood);
}

const Detalhes = () => {
  const { isFavorite, setIsFavorite, isMeal, setIsMeal, foodDetails,
    setFoodDetails, hidden, setHidden, usedIngri, setUseIngri,
    inProgress, setInProgress, handleIsFavorite } = useContext(LariContext);
  const [ingredients, setIngredients] = useState([]);
  const [able, setAble] = useState(true);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const verifyButnValidation = (ingredient) => {
      // console.log(ingredient.length, usedIngri.length);
      if (ingredient.length === usedIngri.length) {
        // console.log('terminou');
        setAble(false);
      } else {
        setAble(true);
        // console.log('ainda n terminou');
      }
    };
    verifyButnValidation(ingredients);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usedIngri.length]);

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

      handleInProgress(id, type === 'comidas', setInProgress, setUseIngri);
    };

    fetchData();
  }, [location.pathname]);

  if (!Object.keys(foodDetails).length) return <h2>Loading...</h2>;
  const ObjUsedIngri = { obj: usedIngri, fun: setUseIngri, isMeal };
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
      <button
        type="button"
        onClick={ async () => {
          const link = window.location.href.split('/in-progress')[0];
          const one = 1000;
          copy(link);
          setHidden(true);
          setTimeout(() => setHidden(false), one);
        } }
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="Share" />
        <span hidden={ !hidden }>Link copiado!</span>
      </button>
      <input
        type="image"
        data-testid="favorite-btn"
        onClick={ () => handleIsFavorite(!isFavorite) }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Favorite"
      />

      { (usedIngri[0] !== 'ElisaEumaGenia')
        && ingredients.map((ingredient, index) => {
          const ingredientName = foodDetails[ingredient];
          const ingMeasure = foodDetails[ingredient.replace('Ingredient', 'Measure')];

          return (
            <div key={ ingredient } data-testid={ `${index}-ingredient-step` }>
              { usedIngri.indexOf(ingredientName) >= 0
                ? <s>{`${ingredientName} - ${ingMeasure}`}</s>
                : `${ingredientName} - ${ingMeasure}` }

              <input
                onChange={ ({ target }) => {
                  handleCheckBox(target.value, inProgress,
                    foodDetails, ObjUsedIngri);
                } }
                type="checkbox"
                value={ `${ingredientName}` }
                checked={ usedIngri.indexOf(ingredientName) >= 0 }
              />
            </div>
          );
        })}
      <p data-testid="instructions">{foodDetails.strInstructions}</p>

      <button
        type="button"
        onClick={ () => { history.push('/receitas-feitas'); } }
        data-testid="finish-recipe-btn"
        disabled={ able }
      >
        Finalizar Receita

      </button>
    </div>
  );
};
export default Detalhes;
