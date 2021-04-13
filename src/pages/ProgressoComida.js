import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { favsLocalStorage,
  getFoodById,
  ProgressFoodFunc,
  saveDoneRecipes } from '../services/API';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import IngredientsList from '../components/IngredientsList';

function ProgressoComida() {
  const history = useHistory();
  const { location } = history;

  const POS_IN_PATHNAME = 3;
  const ARR_POS = 2;
  const id = location.pathname.split('/', POS_IN_PATHNAME)[ARR_POS];

  const [fav, setFav] = useState(false);
  const [meal, setMeal] = useState({});
  const [toRender, setToRender] = useState(false);
  const [done, setDone] = useState([]);

  const ingredients = [];
  const measure = [];
  const PROPS_LIMITER = 20;

  useEffect(() => {
    favsLocalStorage();
    getFoodById(id).then(({ meals }) => {
      setMeal(meals[0]);
      setToRender(true);
      const getFavsFromLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (getFavsFromLocal.some((recipe) => recipe.id === Number(id))) {
        setFav(true);
      } else {
        setFav(false);
      }
    });
    ProgressFoodFunc();
    setDone(saveDoneRecipes());
  }, [id]);

  if (toRender) {
    for (let i = 1; i <= PROPS_LIMITER; i += 1) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(meal[`strIngredient${i}`]);
        measure.push(meal[`strMeasure${i}`]);
      }
    }
  }

  console.log(location.pathname);

  const share = (e) => {
    e.target.innerText = 'Link copiado!';
    copy(`http://localhost:3000/comidas/${id}`);
  };

  const favorite = () => {
    const recipe = {
      id: Number(meal.idMeal),
      type: 'comida',
      area: meal.strArea,
      category: meal.strCategory,
      alcoholicOrNot: '',
      name: meal.strMeal,
      image: meal.strMealThumb,
      doneDate: '',
      tags: meal.strTags.split(','),
    };

    const getFavsFromLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getFavsFromLocal.some((r) => r.id === Number(meal.idMeal))) {
      setFav(false);
      return localStorage.setItem(
        'favoriteRecipes',

        JSON.stringify(getFavsFromLocal.filter((r) => r.id !== Number(meal.idMeal))),
      );
    }
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([...getFavsFromLocal, recipe]),
    );
    return setFav(true);
  };

  const saveLocalStorage = () => {
    localStorage.setItem('doneRecipes', JSON.stringify([...done, {
      id: meal.idMeal,
      type: 'comida',
      area: meal.strArea,
      category: meal.strCategory,
      alcoholicOrNot: '',
      name: meal.strMeal,
      image: meal.strMealThumb,
      doneDate: '',
      tags: meal.strTags.split(','),
    }]));
    history.push('/receitas-feitas');
  };
  return (
    toRender
    && (
      <div>
        <h1 data-testid="recipe-title">{meal.strMeal}</h1>
        <p data-testid="recipe-category">{meal.strCategory}</p>
        <img
          src={ meal.strMealThumb }
          data-testid="recipe-photo"
          alt={ meal.strMeal }
          className="g6-img-detail"
        />
        <div className="g6-group-buttons">
          <button
            onClick={ (e) => share(e) }
            type="button"
            data-testid="share-btn"
          >
            Compartilhar
          </button>
          <button
            onClick={ () => favorite() }
            type="button"
          >
            <img
              id="fav"
              src={ fav ? blackHeartIcon : whiteHeartIcon }
              alt="favoritar"
              data-testid="favorite-btn"
            />
          </button>
        </div>
        <h3>Lista de Ingredientes:</h3>
        <IngredientsList ingredients={ ingredients } measure={ measure } id={ id } />
        <h3>Instruções</h3>
        <p data-testid="instructions">{ meal.strInstructions }</p>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ () => saveLocalStorage() }
          // disabled={ checkValidity }
        >
          Finalizar Receita
        </button>
      </div>
    )
  );
}

export default ProgressoComida;
