import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

import StyledHeader from '../styles/component/Header';

export default function Header({ pageTitle, showSearchButton }) {
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <>
      <StyledHeader>
        <Link to="/perfil">
          <img src={ profileIcon } alt="Profile Icon" data-testid="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title">{pageTitle}</h1>
        {showSearchButton && (
          <button type="button" onClick={ () => setShowSearchInput(!showSearchInput) }>
            <img src={ searchIcon } alt="Search Icon" data-testid="search-top-btn" />
          </button>
        )}
      </StyledHeader>
      {showSearchInput && <SearchBar />}
    </>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  showSearchButton: PropTypes.bool,
};

Header.defaultProps = {
  showSearchButton: true,
};
