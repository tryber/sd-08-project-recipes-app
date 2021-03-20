import React, { useState } from 'react';
import { Button, Form, Navbar, NavLink } from 'react-bootstrap';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [searchBar, setSearchBar] = useState(false);

  function handleClick() {
    setSearchBar(!searchBar);
  }

  return (
    <div className="w-100">
      <Navbar
        className="d-flex bg-warning justify-content-between align-items-center w-100"
      >
        <NavLink
          href="/perfil"
          data-testid="profile-top-btn"
          className="btn btn-warning border-0"
        >
          <img src={ profileIcon } className="img-fluid" alt="Profile Icon" />
        </NavLink>
        <span data-testid="page-title">Comidas</span>
        <NavLink
          href="#"
          onClick={ handleClick }
          data-testid="search-top-btn"
          className="btn btn-warning border-0"
        >
          <img src={ searchIcon } className="img-fluid" alt="Search Icon" />
        </NavLink>
      </Navbar>
      { searchBar ? (
        <Form className="fs-6 border">
          <Form.Row>
            <Form.Group controlId="input-search" className="m-1">
              <Form.Control
                type="text"
                placeholder="Buscar Receitas"
                data-testid="search-input"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="radioPrefer" className="m-1 lh-1">
              <Form.Check inline name="radioPrefer" id="ingredientes">
                <Form.Check.Input type="radio" />
                <Form.Check.Label>Ingredientes</Form.Check.Label>
              </Form.Check>
              <Form.Check inline name="radioPrefer" id="nome">
                <Form.Check.Input type="radio" />
                <Form.Check.Label>Nome</Form.Check.Label>
              </Form.Check>
              <Form.Check inline name="radioPrefer" id="primeira letr">
                <Form.Check.Input type="radio" />
                <Form.Check.Label>Primeira letra</Form.Check.Label>
              </Form.Check>
            </Form.Group>
          </Form.Row>
          <Button
            variant="primary"
            type="button"
            data-testid="exec-search-btn"
            className="m-1"
          >
            Buscar
          </Button>
        </Form>) : false }
    </div>
  );
}

export default Header;
