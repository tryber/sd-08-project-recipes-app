import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHearticon from '../images/whiteHeartIcon.svg';
import { requestFoodById } from '../services/requestFoodsAPI';

function FoodDetails({ match: { params: { id } } }) {
  const [meal, setMeal] = useState([]);
  useEffect(
    () => {
      async function requestApi() {
        const foodRecipe = await requestFoodById(id);
        setMeal(foodRecipe);
      }
      requestApi();
    }, [],
  );
  const { strMeal, strMealThumb, Side, strInstructions, strYoutube } = meal;

  const vinte = 20;
  const arrayIngredients = [];
  const filteredIngredients = async (Meal) => {
    for (let i = 1; i <= vinte; i += 1) {
      arrayIngredients.push(Meal[`strIngredient${i}`]);
      arrayIngredients.push(Meal[`strMeasure${i}`]);
    }
  };
  setTimeout(() => {
    filteredIngredients(meal);
    console.log(arrayIngredients);
  }, (vinte * 100));

  return (
    <main>
      <img data-testid="recipe-photo" src={ strMealThumb } alt="Imagem da receita" />
      <section>
        <h1>{strMeal}</h1>
        <span data-testid="recipe-category">{ Side }</span>
        <input data-testid="share-btn" type="image" src={ shareIcon } alt="favorito" />
        <input
          data-testid="favorite-btn"
          type="image"
          src={ whiteHearticon }
          alt="favorito"
        />
      </section>

      <section>
        <h2>Ingredients</h2>
        {/* <ul>
          { arrayIngredients.map(
            (ingrediente, i) => (
              <li
                data-testid={ `${i}-ingredient-name-and-measur` }
                key={ i }
              >
                { ingrediente }
              </li>
            ),
          )}
        </ul> */}
      </section>

      <section>
        <h2>Instruções</h2>
        <p data-testid="instructions">{strInstructions}</p>
      </section>

      <video data-testid="video" controls muted>
        <source src={ strYoutube } />
      </video>

      <section>
        {/* { array.map((drink, index) => (
          <Card
            index={ index }
            key={ drink.idDrink }
            id={ drink.idDrink }
            imagePath={ drink.strDrinkThumb }
            title={ drink.strDrink }
            category={ drink.strCategory }
          />
        ))} */}

      </section>
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </main>
  );
}
FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
export default FoodDetails;
