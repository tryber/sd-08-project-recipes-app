import React from 'react';
import { useHistory } from 'react-router';

function DoneRecipesButton() {
  const history = useHistory();
  return (
    <button
      onClick={ () => history.push('/receitas-feitas') }
      className="btnz btn btn-primary"
      data-testid="profile-done-btn"
      type="button"
    >
      Receitas Feitas
    </button>
  );
}

export default DoneRecipesButton;
