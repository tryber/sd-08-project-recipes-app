import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContextReceitas from '../context/ContextReceitas';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Perfil() {
  const {
    enviarTituloDaPagina,
    mudarStatusBotaoPesquisa,
  } = useContext(ContextReceitas);
  useEffect(() => {
    enviarTituloDaPagina('Perfil');
    mudarStatusBotaoPesquisa(false);
  }, []);

  let emailLocal = 'alerta de penetra';

  if (JSON.parse(localStorage.getItem('user'))) {
    emailLocal = JSON.parse(localStorage.getItem('user')).email;
  }

  return (
    <div>
      <Header />
      <p data-testid="profile-email">
        { emailLocal }
      </p>
      <div>
        <Link to="/receitas-feitas">
          <button
            style={ { width: '150px', color: 'black' } }
            variant="outline-warning"
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

export default Perfil;
