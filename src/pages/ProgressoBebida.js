import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { favsLocalStorage,
  getDrinkById,
  ProgressFoodFunc,
  saveDoneRecipes } from '../services/API';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import IngredientsCocktail from '../components/IngredientsCocktail';

function ProgressoBebida() {
  const history = useHistory();
  const { location } = history;
  const POS_IN_PATHNAME = 3;
  const ARR_POS = 2;
  const id = location.pathname.split('/', POS_IN_PATHNAME)[ARR_POS];

  const [fav, setFav] = useState(false);
  const [drink, setDrink] = useState({});
  const [toRender, setToRender] = useState(false);
  const [done, setDone] = useState([]);
  const ingredients = [];
  const measure = [];

  useEffect(() => {
    favsLocalStorage();
    getDrinkById(id).then(({ drinks }) => {
      setDrink(drinks[0]);
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

  const PROP_LIMITER = 20;

  if (toRender) {
    for (let i = 1; i <= PROP_LIMITER; i += 1) {
      if (drink[`strIngredient${i}`]) {
        ingredients.push(drink[`strIngredient${i}`]);
        measure.push(drink[`strMeasure${i}`]);
      }
    }
  }

  // const handleClick = () => {
  //   history.push(`/bebidas/${id}/in-progress`);
  // };

  const share = (e) => {
    e.target.innerText = 'Link copiado!';
    copy(`http://localhost:3000/bebidas/${id}`);
  };

  const favorite = () => {
    const recipe = {
      id: Number(drink.idDrink),
      type: 'bebida',
      area: '',
      category: drink.strCategory,
      alcoholicOrNot: drink.strAlcoholic,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
      doneDate: '',
      tags: drink.strTags.split(','),
    };

    const getFavsFromLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getFavsFromLocal.some((r) => r.id === Number(drink.idDrink))) {
      setFav(false);
      return localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(getFavsFromLocal.filter((r) => r.id !== Number(drink.idDrink))),
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
      id: drink.idMeal,
      type: 'bebida',
      area: drink.strArea,
      category: drink.strCategory,
      alcoholicOrNot: '',
      name: drink.strMeal,
      image: drink.strMealThumb,
      doneDate: '',
      tags: drink.strTags.split(','),
    }]));
    history.push('/receitas-feitas');
  };
  return toRender && (
    <div>
      <h1 data-testid="recipe-title">{ drink.strDrink }</h1>
      <p data-testid="recipe-category">{ drink.strAlcoholic }</p>
      <img
        src={ drink.strDrinkThumb }
        data-testid="recipe-photo"
        alt={ drink.strdrink }
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
        <button onClick={ () => favorite() } type="button">
          <img
            id="fav"
            src={ fav ? blackHeartIcon : whiteHeartIcon }
            alt="favoritar"
            data-testid="favorite-btn"
          />
        </button>
      </div>
      <h3>Lista de Ingredientes:</h3>
      <IngredientsCocktail ingredients={ ingredients } measure={ measure } id={ id } />
      <h3>Instruções</h3>
      <p data-testid="instructions">{ drink.strInstructions }</p>
      <button
        type="button"
        // onClick={ () => handleClick() }
        className="g6-start-recipe-btn"
        data-testid="finish-recipe-btn"
        onClick={ () => saveLocalStorage() }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default ProgressoBebida;
