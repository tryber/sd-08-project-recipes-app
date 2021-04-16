import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/Header';
import 'bootstrap/dist/css/bootstrap.css';
import './user.css';

export default function Profile() {
  const emailLocalStorage = window.localStorage.getItem('user');
  const emailObject = JSON.parse(emailLocalStorage);

  return (
    <div className="user">
      <Header title="Perfil" search="false" />
      <div>
        <h3 data-testid="profile-email">
          {
            emailObject
            && emailObject.email
          }
        </h3>
        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
            className="btn btn-outline-primary"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="profile-done-btn"
            className="btn btn-outline-primary"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => window.localStorage.clear() }
            className="btn btn-danger"
          >
            Sair
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
