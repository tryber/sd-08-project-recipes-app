import React from 'react';
import { useHistory } from 'react-router-dom';

function ExploreFoodsButton() {
  const history = useHistory();
  return (
    <button
      onClick={ () => history.push('/explorar/comidas') }
      className="btnz btn btn-danger"
      data-testid="explore-food"
      type="button"
    >
      Explorar Comidas
    </button>
  );
}

export default ExploreFoodsButton;
