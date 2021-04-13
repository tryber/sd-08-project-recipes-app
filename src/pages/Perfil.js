import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';

export default function Perfil() {
  const history = useHistory();

  const handleButton = (target) => {
    history.push(`/${target}`);
  };
  const findEmail = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
      return null;
    }
    return user.email;
  };
  return (
    <div>
      <Header pageTitle="Perfil" />
      <div data-testid="profile-email">{ findEmail()}</div>
      <button
        className="g6-header-button"
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => handleButton('receitas-feitas') }
      >
        Receitas Feitas

      </button>
      <button
        className="g6-header-button"
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => handleButton('receitas-favoritas') }
      >
        Receitas Favoritas

      </button>
      <button
        className="g6-header-button"
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => { localStorage.clear(); handleButton(''); } }
      >
        Sair

      </button>
    </div>
  );
}
