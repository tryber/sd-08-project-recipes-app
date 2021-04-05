import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

import styles from '../styles/components/Header.module.css';

const Header = ({ title, showSearchButton, handleToggleSearchBar }) => (
  <header className={ styles.header }>
    <Link
      to="/perfil"
      type="button"
    >
      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="Profile Icon"
      />
    </Link>

    <h1 data-testid="page-title">
      {title}
    </h1>

    { showSearchButton && (
      <button
        type="button"
        onClick={ handleToggleSearchBar }
      >
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="Search icon"
        />
      </button>
    )}
  </header>
);

Header.defaultProps = {
  showSearchButton: false,
  handleToggleSearchBar: () => {},
  title: '',
};

Header.propTypes = {
  showSearchButton: PropTypes.bool,
  title: PropTypes.string,
  handleToggleSearchBar: PropTypes.func,
};

export default Header;
