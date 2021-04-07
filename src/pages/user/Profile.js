import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/Header';

export default function Profile() {
  const emailLocalStorage = localStorage.getItem('user');
  const emailObject = JSON.parse(emailLocalStorage);

  return (
    <div>
      <Header title="Perfil" search="false" />
      <div>
        <h3 data-testid="profile-email">
          {
            emailObject
            && emailObject.email
          }
        </h3>
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => localStorage.clear() }
          >
            Sair
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
