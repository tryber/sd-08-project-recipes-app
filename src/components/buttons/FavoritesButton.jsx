import React from 'react';
import { useHistory } from 'react-router';

function FavoritesButton() {
  const history = useHistory();
  return (
    <button
      onClick={ () => history.push('/receitas-favoritas') }
      className="btnz btn btn-primary"
      data-testid="profile-favorite-btn"
      type="button"
    >
      Receitas Favoritas
    </button>
  );
}

export default FavoritesButton;
