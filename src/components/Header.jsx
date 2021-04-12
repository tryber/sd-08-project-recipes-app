import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchDropDown from './SearchDropDown';
import ProfileButton from './buttons/ProfileButton';
import SearchButton from './buttons/SearchButton';

function Header(props) {
  const { pathname } = useLocation();
  const { title } = props;
  const [dropSearch, setDropSearch] = useState(false);
  return (
    <>
      <header className="header-container" data-testid="header-container">
        <ProfileButton />
        <h2 data-testid="page-title">
          {
            title
          }
        </h2>
        {
          pathname === '/comidas'
          || pathname === '/bebidas'
          || pathname === '/explorar/comidas/area'
            ? <SearchButton handleDrop={ setDropSearch } status={ dropSearch } /> : null
        }
      </header>
      {dropSearch ? <SearchDropDown setDropSearch={ setDropSearch } /> : null}
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
