import React from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Footer } from '../component';

export default function Profile() {
  const history = useHistory();
  const userEmail = JSON.parse(localStorage.getItem('user')) || '';

  const recipesDone = () => {
    history.push('/receitas-feitas');
  };

  const recipesFav = () => {
    history.push('/receitas-favoritas');
  };

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <>
      <Header pageTitle="Perfil" showSearchButton={ false } />
      <div>
        <span data-testid="profile-email">{userEmail.email}</span>
      </div>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ recipesDone }
      >
        Receitas Feitas
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ recipesFav }
      >
        Receitas Favoritas
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ logout }
      >
        Sair
      </button>
      <Footer />
    </>
  );
}
