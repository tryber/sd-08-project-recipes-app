import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar';

import ProfileIcon from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';
import './header.css';

function Header({ history }) {
  const [searchButton, setSearchButton] = useState(false);
  const { location: { pathname } } = history;

  let title = '';
  let search = true;
  switch (pathname) {
  case '/perfil':
    title = 'Perfil';
    search = false;
    break;
  case '/bebidas':
    title = 'Bebidas';
    break;
  case '/comidas':
    title = 'Comidas';
    break;
  case '/explorar/bebidas':
    title = 'Explorar Bebidas';
    search = false;
    break;
  case '/explorar/comidas':
    title = 'Explorar Comidas';
    search = false;
    break;
  case '/explorar':
    title = 'Explorar';
    search = false;
    break;
  case '/explorar/comidas/ingredientes':
  case '/explorar/bebidas/ingredientes':
    title = 'Explorar Ingredientes';
    search = false;
    break;
  case '/explorar/comidas/area':
    title = 'Explorar Origem';
    break;
  case '/receitas-feitas':
    title = 'Receitas Feitas';
    search = false;
    break;
  case '/receitas-favoritas':
    title = 'Receitas Favoritas';
    search = false;
    break;
  default:
    break;
  }

  return (
    <header>
      <nav>
        <a href="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ ProfileIcon }
            alt="profile link to page"
          />
        </a>
        <h1 data-testid="page-title">{title}</h1>
        {search && (
          <button
            type="button"
            onClick={ () => setSearchButton((previousState) => !(previousState)) }
          >
            <img
              data-testid="search-top-btn"
              src={ SearchIcon }
              alt="search icon"
            />
          </button>
        ) }
      </nav>
      <section>
        {searchButton && <SearchBar history={ history } />}
      </section>
    </header>
  );
}

Header.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Header;
