import React from 'react';
import { useHistory } from 'react-router';

function ExploreByIngredientsButton() {
  const history = useHistory();
  return (
    <button
      onClick={ () => history.push('/explorar/comidas/ingredientes') }
      className="btnz btn btn-primary"
      data-testid="explore-by-ingredient"
      type="button"
    >
      Por Ingredientes
    </button>
  );
}

export default ExploreByIngredientsButton;
