import React, { useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import './style.css';
import SeekBar from '../SeekBar';

export default function Header(props) {
  const [showSeachbar, setShowSeachbar] = useState(false);
  const { title } = props;
  const match = useRouteMatch();
  const currentPage = (match.url === '/comidas' || match.url === '/bebidas'
  || match.url === '/explorar/comidas/area');

  function controlSearchbar(e) {
    const { target: { checked } } = e;
    setShowSeachbar(checked);
  }

  function renderSearchBarIcon() {
    if (currentPage) {
      return (
        <label htmlFor="searchBarControl" className="navbar-brand searchIcon">
          <img
            src={ searchIcon }
            alt="Link para a barra de pesquisa"
            data-testid="search-top-btn"
          />
          <input
            type="checkbox"
            className="searchBarControl"
            id="searchBarControl"
            onClick={ controlSearchbar }
          />
        </label>
      );
    }
    return <span>{' '}</span>;
  }
  return (
    <Container className="px-0" fluid>
      <Navbar className="justify-content-around align-items-center bg-warning header">
        <Navbar.Brand href="/perfil">
          <img
            src={ profileIcon }
            alt="Link para o perfil"
            data-testid="profile-top-btn"
          />
        </Navbar.Brand>
        <h1 className="m-0 h5" data-testid="page-title">{title}</h1>
        { renderSearchBarIcon() }
      </Navbar>
      { showSeachbar && <SeekBar
        type="text"
        placeholder="Pesquisar"
        data-testid="search-input"
        title={ title }
      />}
    </Container>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
