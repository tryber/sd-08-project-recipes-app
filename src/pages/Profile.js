import React from 'react';
import './Profile.css';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderSimple from '../components/HeaderSimple';

function Profile() {
  const history = useHistory();
  const userEmail = JSON.parse(localStorage.getItem('user')) || '';

  const recipesDone = () => {
    history.push('/receitas-feitas');
  };

  const recipesFavorites = () => {
    history.push('/receitas-favoritas');
  };

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="container">
      <HeaderSimple />
      <div className="main">
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
          onClick={ recipesFavorites }
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
    </div>
  );
}

export default Profile;
