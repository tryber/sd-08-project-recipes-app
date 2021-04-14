import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import './header.css';

import Context from '../../contextApi/Context';

const Header = ({ title, visible, dataTestIdSearch = "search-top-btn" }) => {
  const { setSearchBar, searchBar } = useContext(Context);
  const [redirect, setRedirect] = useState(false);
  return (
    <div>
      {redirect && <Redirect to="/perfil" />}
      <div className="header">
        <button type="button" onClick={ () => setRedirect(true) }>
          <img
            src={ profileIcon }
            alt="Profile icon"
            data-testid="profile-top-btn"
          />
        </button>
        <span data-testid="page-title">{title}</span>
        {visible && (
          <button type="button" onClick={ () => setSearchBar(!searchBar) }>
            <img
              src={ searchIcon }
              alt="Search icon"
              data-testid={dataTestIdSearch}
            />
          </button>
        )}
      </div>
    </div>
  );
};
Header.defaultProps = {
  visible: true,
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  dataTestIdSearch: PropTypes.string.isRequired,
};

export default Header;
