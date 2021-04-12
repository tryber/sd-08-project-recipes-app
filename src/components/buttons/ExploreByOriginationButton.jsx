import React from 'react';
import { useHistory } from 'react-router';

function ExploreByOriginationButton() {
  const history = useHistory();
  return (
    <button
      onClick={ () => history.push('/explorar/comidas/area') }
      className="btnz btn btn-primary"
      data-testid="explore-by-area"
      type="button"
    >
      Por Local de Origem
    </button>
  );
}

export default ExploreByOriginationButton;
