import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { favsLocalStorage, getDrinkById, handleUseEffectDetalhes } from '../services/API';
import RecipesContext from '../context/RecipesContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DetalhesBebida() {
  const history = useHistory();
  const { location } = history;
  const POS_IN_PATHNAME = 3;
  const ARR_POS = 2;
  const MEAL_LIMITER = 6;
  const id = location.pathname.split('/', POS_IN_PATHNAME)[ARR_POS];

  const [fav, setFav] = useState(false);
  const [drink, setDrink] = useState({});
  const [toRender, setToRender] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const ingredients = [];
  const measure = [];

  const { foodRandom, data } = useContext(RecipesContext);

  useEffect(() => {
    favsLocalStorage();
    getDrinkById(id).then(({ drinks }) => {
      setDrink(drinks[0]);
      foodRandom();
      setToRender(true);
      handleUseEffectDetalhes(id, setFav, setInProgress, false);
    });
  }, []);

  const PROP_LIMITER = 20;

  if (toRender) {
    for (let i = 1; i <= PROP_LIMITER; i += 1) {
      if (drink[`strIngredient${i}`]) {
        ingredients.push(drink[`strIngredient${i}`]);
        measure.push(drink[`strMeasure${i}`]);
      }
    }
  }

  const handleClick = () => {
    history.push(`/bebidas/${id}/in-progress`);
  };

  const share = (e) => {
    e.target.innerText = 'Link copiado!';
    copy(`http://localhost:3000${location.pathname}`);
  };

  const favorite = () => {
    setFav(!fav);
    const recipe = {
      id: drink.idDrink,
      type: 'bebida',
      area: '',
      category: drink.strCategory,
      alcoholicOrNot: drink.strAlcoholic,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
      // doneDate: '',
      // tags: [],
    };

    const getFavsFromLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getFavsFromLocal.some((r) => r.id === Number(drink.idDrink))) {
      return localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(getFavsFromLocal.filter((r) => r.id !== Number(drink.idDrink))),
      );
    }
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([...getFavsFromLocal, recipe]),
    );
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
      <ul>
        { ingredients.map((ing, i) => (
          <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
            { `${measure[i]} of ${ing}` }
          </li>
        )) }
      </ul>
      <h3>Instruções</h3>
      <p data-testid="instructions">{ drink.strInstructions }</p>
      <button
        type="button"
        onClick={ () => handleClick() }
        className="g6-start-recipe-btn"
        data-testid="start-recipe-btn"
      >
        { inProgress ? 'Continuar Receita' : 'Iniciar Receita' }
      </button>
      <h3>Receitas Recomendadas</h3>
      <div className="g6-caroussel">
        { data.food.map((f, i) => (
          i < MEAL_LIMITER && (
            <section
              key={ i }
              data-testid={ `${i}-recomendation-card` }
              className="g6-card"
            >
              <h3
                data-testid={ `${i}-recomendation-title` }
              >
                { f.strMeal }
              </h3>
              <img
                data-testid={ `${i}-card-img` }
                src={ f.strMealThumb }
                alt={ f.strMeal }
              />
            </section>
          )
        ))}
      </div>
    </div>
  );
}

export default DetalhesBebida;
