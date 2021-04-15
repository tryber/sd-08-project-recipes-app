import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';

function Header({ children, explore, component }) {
  const [search, setSearch] = useState(false);

  const searchBar = () => {
    setSearch(!search);
  };

  const searchButton = () => (
    <button type="button" onClick={ searchBar } className="header-search-button">
      <img
        src={ searchIcon }
        alt="Ícone de Pesquisa"
        data-testid="search-top-btn"
      />
    </button>
  );

  return (
    <>
      <header className="header-container">
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="Ícone de Perfil"
            data-testid="profile-top-btn"
            className="header-search-button"
          />
        </Link>
        <h2 data-testid="page-title">{children}</h2>
        {
          (explore === 'false') ? <img
            src={ exploreIcon }
            alt="Ícone de Explorar"
            data-testid="explore-top-btn"
          /> : searchButton()
        }
      </header>
      {search && component}
    </>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  explore: PropTypes.element.isRequired,
  component: PropTypes.node.isRequired,
};

export default Header;
