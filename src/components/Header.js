import React, { useState, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import double from '../images/double.svg';
import Input from './Inputs';
import Button from './Button';
import getResultFromAPI from '../api/getResultFromAPI';
import contextRecipes from '../context/Context';

const Header = (props) => {
  const { title, disableBtn } = props;
  const [showSearchBar, setShow] = useState(false);
  const [userButton, setUserButton] = useState('');
  const [userInput, setUserInput] = useState('');

  const { pathname } = useLocation();
  const context = useContext(contextRecipes);
  const history = useHistory();

  function handleSearchInput({ target: { value } }) {
    setUserInput(value);
  }

  function handleFilterType({ target: { value } }) {
    setUserButton(value);
  }

  const idStringOptions = {
    '/comidas': 'idMeal',
    '/bebidas': 'idDrink',
  };

  async function handleSearchButton() {
    if (userButton === 'busca da primeira letra' && userInput.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
      return;
    }
    const results = await getResultFromAPI(pathname, userButton, userInput);
    if (results === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return;
    }
    if (results) context.setFilter(results);
    if (results.length === 1) {
      const idType = idStringOptions[pathname];
      const id = results[0][idType];
      history.push(`${pathname}/${id}`);
    }
  }

  function renderSearchBar() {
    return (
      <section className="search-options">
        <div className="search-top">
          <Input
            type="text"
            datatestid="search-input"
            onChange={ handleSearchInput }
            value={ userInput }
          />
          {/* <Button
            datatestid="exec-search-btn"
            type="button"
            label="Buscar"
            onClick={ handleSearchButton }
          /> */}
          <input
            type="image"
            className="filter-btn"
            src={ double }
            alt="arrow"
            data-testid="exec-search-btn"
            onClick={ handleSearchButton }
          />
        </div>
        <div className="search-bottom">
          <Input
            type="radio"
            datatestid="ingredient-search-radio"
            value="Ingredients"
            name="food"
            label="Ingredientes "
            onChange={ handleFilterType }
          />
          <Input
            type="radio"
            datatestid="name-search-radio"
            value="busca por nome"
            label="Nome "
            name="food"
            onChange={ handleFilterType }
          />
          <Input
            type="radio"
            datatestid="first-letter-search-radio"
            value="busca da primeira letra"
            label="Letra "
            name="food"
            onChange={ handleFilterType }
          />
        </div>
      </section>
    );
  }

  function renderSearchBtn() {
    return (
      <Input
        type="image"
        src={ search }
        alt="search"
        onClick={ () => setShow(!showSearchBar) }
        datatestid="search-top-btn"
      />
    );
  }

  return (
    <header>
      <section className="header-bar">
        <div className="nav-header-button">
          <Link to="/perfil">
            <input
              type="image"
              src={ profile }
              alt="prof"
              data-testid="profile-top-btn"
              className="profile-image"
            />
          </Link>
        </div>
        <div className="nav-header-title">
          <h3 data-testid="page-title">{ title }</h3>
        </div>
        <div className="nav-header-button">
          { !disableBtn && renderSearchBtn() }
        </div>
      </section>
      { showSearchBar && renderSearchBar() }
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  disableBtn: PropTypes.bool.isRequired,
};

export default Header;
