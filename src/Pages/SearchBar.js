import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../Components';
import { fetchItem } from '../store/apiSlice';

function SearchBar() {
  const isSearching = useSelector((state) => state.search.isSearching);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('ingredientes');
  const dispatch = useDispatch();

  const PRIMEIRA_LETRA = 'primeira-letra';
  const history = useHistory();
  const local = history.location.pathname;

  function handlePesquisa() {
    let site = '';
    if (local.includes('comida')) {
      site = 'themealdb';
    } else if (local.includes('bebidas')) {
      site = 'thecocktaildb';
    }

    if (searchType === 'ingredientes') {
      dispatch(fetchItem(`https://www.${site}.com/api/json/v1/1/filter.php?i=${searchValue}`));
    } else if (searchType === 'nome') {
      dispatch(fetchItem(`https://www.${site}.com/api/json/v1/1/search.php?s=${searchValue}`));
    } else if (searchType === PRIMEIRA_LETRA && searchValue.length === 1) {
      dispatch(fetchItem(`https://www.${site}.com/api/json/v1/1/search.php?f=${searchValue}`));
    } else if (searchType === PRIMEIRA_LETRA && searchValue.length > 0) {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }

  if (isSearching) {
    return (
      <Form>
        <Input
          name="Pesquisar"
          dataId="search-input"
          value={ searchValue }
          onChange={ (e) => setSearchValue(e.target.value) }
        />
        <Form.Check
          name="pesquisar"
          type="radio"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          label="Ingredientes"
          value="ingredientes"
          defaultChecked
          onClick={ () => setSearchType('ingredientes') }
          inline
        />
        <Form.Check
          name="pesquisar"
          type="radio"
          id="name-search-radio"
          data-testid="name-search-radio"
          label="Nome"
          value="nome"
          onClick={ () => setSearchType('nome') }
          inline
        />
        <Form.Check
          name="pesquisar"
          type="radio"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          label="Primeira Letra"
          value={ PRIMEIRA_LETRA }
          onClick={ () => setSearchType(PRIMEIRA_LETRA) }
          inline
        />
        <Button
          variant="primary"
          data-testid="exec-search-btn"
          onClick={ () => handlePesquisa() }
        >
          Pesquisar
        </Button>
      </Form>
    );
  }
  return null;
}

export default SearchBar;
