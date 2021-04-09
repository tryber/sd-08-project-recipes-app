import React from 'react';
import { useHistory } from 'react-router-dom';

function ExploreButtons() {
  const history = useHistory();

  function redirectToMeals() {
    history.push('/explorar/comidas');
  }

  function redirectToDrinks() {
    history.push('/explorar/bebidas');
  }

  return (
    <div>
      <button
        type="button"
        data-testid="explore-food"
        onClick={ redirectToMeals }
      >
        Explorar Comidas
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ redirectToDrinks }
      >
        Explorar Bebidas
      </button>
    </div>

  );
}

export default ExploreButtons;
