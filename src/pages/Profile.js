import React from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Footer } from '../component';
import StyledProfile from '../styles/Profile';

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
    <StyledProfile>
      <Header pageTitle="Perfil" showSearchButton={ false } />
      <h5 data-testid="profile-email">{userEmail.email}</h5>
      <div className="btn-container">
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
      </div>
      <Footer />
    </StyledProfile>
  );
}
