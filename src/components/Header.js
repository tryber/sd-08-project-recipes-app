import React, { useContext, useState } from 'react';
import { Button, Form, Navbar, NavLink } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const searchItensInitial = {
    input: '',
    radio: 'ingredientes',
  };
  const {
    headerInfo,
    setHeaderInfo,
    setBarraBuscar,
    setIsFetching } = useContext(ContextRecipes);
  const history = useHistory();
  const [searchBar, setSearchBar] = useState(false);
  const [searchItens, setSearchItens] = useState(searchItensInitial);

  function handleClickProfileBtn() {
    setHeaderInfo({ pageTitle: 'Perfil', showSearchIcon: false });
    return history.push('/perfil');
  }

  function handleClickSearchBtn() {
    setSearchBar(!searchBar);
  }

  function handleClickBuscarBtn() {
    const { input, radio } = searchItens;
    setBarraBuscar({ input, radio });
    setIsFetching(true);
  }

  return (
    <div className="w-100 fixedHeader">
      <Navbar
        className="d-flex bg-warning justify-content-between align-items-center w-100"
      >
        <NavLink
          className="btn btn-warning border-0"
          onClick={ handleClickProfileBtn }
          data-testid="profile-top-btn"
          src="../images/profileIcon.svg"
        >
          <img src={ profileIcon } className="img-fluid" alt="Profile Icon" />
        </NavLink>
        <h2 data-testid="page-title" className="m-0">{ headerInfo.pageTitle }</h2>
        { headerInfo.showSearchIcon ? (
          <NavLink
            onClick={ handleClickSearchBtn }
            data-testid="search-top-btn"
            className="btn btn-warning border-0"
            src="../images/searchIcon.svg"
          >
            <img src={ searchIcon } className="img-fluid" alt="Search Icon" />
          </NavLink>) : <div style={ { width: '62px' } } /> }
      </Navbar>
      { searchBar ? (
        <Form className="border bg-light d-flex flex-column align-items-center w-100">
          <Form.Row className="w-100">
            <Form.Group className="w-100 p-1">
              <Form.Control
                type="text"
                className="w-100"
                placeholder="Buscar Receitas"
                data-testid="search-input"
                value={ searchItens.input }
                onChange={ (e) => setSearchItens({
                  ...searchItens,
                  input: e.target.value,
                }) }
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group
              className="m-1 lh-1 d-flex align-items-center"
              value={ searchItens.radio }
              onChange={ (e) => setSearchItens({ ...searchItens, radio: e.target.id }) }
            >
              <Form.Check.Label
                htmlFor="ingredientes"
                className="m-1 d-flex align-items-center"
              >
                <Form.Check.Input
                  inline
                  name="radioPrefer"
                  id="ingredientes"
                  data-testid="ingredient-search-radio"
                  checked={ searchItens.radio === 'ingredientes' }
                  className="m-1"
                />
                Ingredientes
              </Form.Check.Label>
              <Form.Check.Label htmlFor="nome" className="m-1 d-flex align-items-center">
                <Form.Check.Input
                  inline
                  name="radioPrefer"
                  id="nome"
                  data-testid="name-search-radio"
                  checked={ searchItens.radio === 'nome' }
                  className="m-1"
                />
                Nome
              </Form.Check.Label>
              <Form.Check.Label
                htmlFor="primeira letra"
                className="m-1 d-flex align-items-center"
              >
                <Form.Check.Input
                  inline
                  name="radioPrefer"
                  id="primeira letra"
                  data-testid="first-letter-search-radio"
                  checked={ searchItens.radio === 'primeira letra' }
                  className="m-1"
                />
                Primeira letra
              </Form.Check.Label>
            </Form.Group>
          </Form.Row>
          <Button
            variant="secondary"
            type="button"
            data-testid="exec-search-btn"
            className="m-1 w-50"
            onClick={ handleClickBuscarBtn }
          >
            Buscar
          </Button>
        </Form>) : false }
    </div>
  );
}

export default Header;
