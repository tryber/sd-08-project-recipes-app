import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import profileIcon from '../images/profileIcon.svg';
import DefaultSearch from '../Components/Buttons/DefaultSearch';
import SearchBar from './SearchBar';

function Header(props) {
  const { title, searchType } = props;

  return (
    <>
      <Navbar>
        <Nav>
          <Nav.Link as={ Link } to="/perfil">
            <img data-testid="profile-top-btn" src={ profileIcon } alt="Perfil" />
          </Nav.Link>
        </Nav>
        <Navbar.Brand data-testid="page-title">{ title }</Navbar.Brand>
        {searchType === 'default'
          && <DefaultSearch />}
      </Navbar>
      <SearchBar />
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchType: PropTypes.string,
};

Header.defaultProps = {
  searchType: 'default',
};

export default Header;
