import React, { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ pageTitle }) {
  const [search, setSearch] = useState(false);

  const history = useHistory();
  const sendToProfile = () => {
    history.push('/perfil');
  };

  return (
    <header className="g6-header">
      <div className="g6-header-row">
        <button
          className="g6-header-button"
          type="button"
          data-testid="profile-top-btn"
          onClick={ sendToProfile }
        >
          <img src={ ProfileIcon } alt="profile-icon" />
        </button>
        <h1 data-testid="page-title">{ pageTitle }</h1>
        <button
          className="g6-header-button"
          type="button"
          data-testid="search-top-btn"
          onClick={ () => setSearch(!search) }
        >
          <img src={ SearchIcon } alt="search-icon" />
        </button>
      </div>
      <div className="g6-header-row" />
      {search && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default Header;
