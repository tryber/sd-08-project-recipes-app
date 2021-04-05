import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ContextReceitas from '../context/ContextReceitas';
import BarraPesquisa from './BarraPesquisa';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [statusBarraPesquisa, mudarStatusBarraPesquisa] = useState(false);
  const { tituloDaPagina, statusBotaoPesquisa } = useContext(ContextReceitas);

  return (
    <header>
      <div>
        <Link to="/perfil">
          <img
            alt="Ícone do perfil"
            data-testid="profile-top-btn"
            src={ profileIcon }
          />
        </Link>
        <h1 data-testid="page-title">
          { tituloDaPagina }
        </h1>
        { statusBotaoPesquisa && (
          <button
            type="button"
            onClick={ () => mudarStatusBarraPesquisa(!statusBarraPesquisa) }
          >
            <img
              alt="Ícone do Botão de Pesquisa"
              data-testid="search-top-btn"
              src={ searchIcon }
            />
          </button>
        ) }
      </div>
      <div>
        { statusBarraPesquisa && <BarraPesquisa /> }
      </div>
    </header>
  );
}

export default Header;
