import React from 'react';
import { useHistory } from 'react-router-dom';

function ExploreDrinksButton() {
  const history = useHistory();
  return (
    <button
      onClick={ () => history.push('/explorar/bebidas') }
      className="btnz btn btn-primary"
      data-testid="explore-drinks"
      type="button"
    >
      Explorar Bebidas
    </button>
  );
}

export default ExploreDrinksButton;
