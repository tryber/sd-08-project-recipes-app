import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import seachIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

import '../styles/Header.css';

function Header({ title, search }) {
  const [renderSeachBar, setRenderSearchBar] = useState(false);
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt=""
          />
        </Link>
        <h1 data-testid="page-title">
          {title}
        </h1>
        {search === false
          ? ''
          : (
            <input
              onClick={ () => setRenderSearchBar(!renderSeachBar) }
              type="image"
              data-testid="search-top-btn"
              src={ seachIcon }
              alt=""
            />)}

      </div>
      {renderSeachBar && <SearchBar title={ title } />}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool,
};

Header.defaultProps = {
  search: true,
};

export default Header;
