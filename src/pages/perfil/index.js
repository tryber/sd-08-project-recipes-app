import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import Header from '../../components/Header';

function Perfil() {
  const logout = () => {
    localStorage.clear();
  };

  const userEmail = JSON.parse(localStorage.getItem('user')) || '';

  return (
    <>
      <Header explore="false">Perfil</Header>
      <section className="profile-container">
        <p
          data-testid="profile-email"
        >
          { userEmail.email }
        </p>
        <div className="profile-buttons-container">
          <button
            data-testid="profile-done-btn"
            type="button"
            className="page-buttons"
          >
            <Link to="/receitas-feitas">
              Receitas Feitas
            </Link>
          </button>
          <button
            data-testid="profile-favorite-btn"
            type="button"
            className="page-buttons"
          >
            <Link to="/receitas-favoritas">
              Receitas Favoritas
            </Link>
          </button>
          <button
            data-testid="profile-logout-btn"
            type="button"
            className="page-buttons"
            onClick={ logout }
          >
            <Link to="/">
              Sair
            </Link>
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Perfil;
