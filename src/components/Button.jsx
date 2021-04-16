import React from 'react';
import { useHistory } from 'react-router';

function Button() {
  const history = useHistory();
  return (
    <button
      onClick={ () => history.push('/explorar/comidas/area') }
      data-testid="explore-by-area"
      type="button"
      className="explore-btn regular-button"
    >
      Por Local de Origem
    </button>
  );
}

export default Button;
