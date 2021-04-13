import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import ProfileIcon from './ProfileIcon';
import SearchBar from './SearchBar';
import searchSvg from '../images/searchIcon.svg';
import './Header.css';

const Header = () => {
  const { pathname } = useLocation();

  const renderHeader = useRef(() => {});

  const [headerTitle, setHeaderTitle] = useState('Explorar');
  const [searchIcon, setSearchIcon] = useState(false);
  const [searchBar, setSearchBar] = useState(false);

  renderHeader.current = () => {
    switch (pathname) {
    case '/bebidas':
      setHeaderTitle('Bebidas');
      setSearchIcon(true);
      return;
    case '/comidas':
      setHeaderTitle('Comidas');
      setSearchIcon(true);
      return;
    case '/explorar':
      setHeaderTitle('Explorar');
      return;
    case '/explorar/comidas':
      setHeaderTitle('Explorar Comidas');
      return;
    case '/explorar/bebidas':
      setHeaderTitle('Explorar Bebidas');
      return;
    case '/explorar/comidas/ingredientes':
      setHeaderTitle('Explorar Ingredientes');
      return;
    case '/explorar/bebidas/ingredientes':
      setHeaderTitle('Explorar Ingredientes');
      setSearchIcon(false);
      return;
    case '/explorar/comidas/area':
      setHeaderTitle('Explorar Origem');
      setSearchIcon(true);
      return;
    case '/perfil':
      setHeaderTitle('Perfil');
      return;
    case '/receitas-feitas':
      setHeaderTitle('Receitas Feitas');
      return;
    case '/receitas-favoritas':
      setHeaderTitle('Receitas Favoritas');
      break;
    default:
      break;
    }
  };

  useEffect(() => {
    renderHeader.current();
  }, [pathname]);

  return (
    <header>
      <Row className="header">
        <Col><ProfileIcon /></Col>
        <Col><h1 data-testid="page-title">{ headerTitle }</h1></Col>
        <Col>
          { searchIcon
            && <img
              role="presentation"
              data-testid="search-top-btn"
              src={ searchSvg }
              alt="search-btn"
              onClick={ () => setSearchBar(!searchBar) }
            /> }
        </Col>
      </Row>
      { searchBar && <SearchBar /> }
    </header>
  );
};

export default Header;
