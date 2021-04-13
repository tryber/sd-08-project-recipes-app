import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchRecipes } from '../actions/recipes';
import './SearchBar.css';

const SearchBar = () => {
  const [filter, setFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { mealsToken, cocktailsToken } = useSelector((state) => state.login);

  const filterRecipes = (e) => {
    e.preventDefault();
    setShow(false);
    if (filter === 'f' && searchText.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
      setShow(true);
      return;
    }
    const token = pathname === 'comidas' ? mealsToken : cocktailsToken;
    if (filter === 'i') {
      dispatch(fetchRecipes(token, pathname.slice(1),
        { request: 'filter', key: filter, parameter: searchText }));
      return;
    }
    dispatch(
      fetchRecipes(token, pathname.slice(1), { key: filter, parameter: searchText }),
    );
    setSearchText('');
  };

  return (
    <>
      <Form className="search-bar">
        <Form.Label>Campo de busca:</Form.Label>
        <Form.Control
          type="text"
          data-testid="search-input"
          value={ searchText }
          onChange={ (e) => setSearchText(e.target.value) }
        />
        <Form.Check
          data-testid="ingredient-search-radio"
          inline
          label="Ingrediente"
          name="filter"
          onClick={ (e) => setFilter(e.target.value) }
          type="radio"
          value="i"
        />
        <Form.Check
          data-testid="name-search-radio"
          inline
          label="Nome"
          name="filter"
          onClick={ (e) => setFilter(e.target.value) }
          type="radio"
          value="s"
        />
        <Form.Check
          data-testid="first-letter-search-radio"
          inline
          label="Primeira letra"
          name="filter"
          onClick={ (e) => setFilter(e.target.value) }
          type="radio"
          value="f"
        />

        <Button
          block
          className="search-bar-btn"
          data-testid="exec-search-btn"
          onClick={ (e) => { filterRecipes(e); } }
          variant="primary"
        >
          Buscar
        </Button>
      </Form>
      { show ? (
        <Alert
          style={ { marginTop: '20px' } }
          variant="danger"
        >
          {
            (Date.now() % 2 === 0)
              ? <Alert.Heading>Uai...</Alert.Heading>
              : <Alert.Heading>Oxi...</Alert.Heading>
          }
          <p>O campo de busca de conter apenas a letra inicial</p>
        </Alert>)
        : '' }
    </>
  );
};

export default SearchBar;
