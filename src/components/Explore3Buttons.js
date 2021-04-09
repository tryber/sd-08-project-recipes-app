import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function Explore3Buttons({ area, name }) {
  const history = useHistory();
  let endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';

  function redirectToArea() {
    history.push('/explorar/comidas/area');
  }

  function renderButton() {
    return (
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ redirectToArea }
      >
        Por Local de Origem
      </button>
    );
  }

  function redirectToIngredients() {
    history.push(`/explorar/${name}/ingredientes`);
  }

  async function redirectRandom() {
    if (name === 'bebidas') {
      endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      const request = await fetch(endpoint);
      const response = await request.json();
      console.log(response);
      history.push(`/${name}/${response.drinks[0].idDrink}`);
    } else {
      const request = await fetch(endpoint);
      const response = await request.json();
      history.push(`/${name}/${response.meals[0].idMeal}`);
    }
  }

  return (
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ redirectToIngredients }
      >
        Por Ingredientes
      </button>
      { area ? renderButton() : null }
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ redirectRandom }
      >
        Me Surpreenda!
      </button>
    </div>
  );
}

export default Explore3Buttons;

Explore3Buttons.propTypes = {
  area: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
