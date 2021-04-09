import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import searchIcon from '../images/searchIcon.svg';
import requestApi from '../services/requestApi';
import '../styles/ExploreButton.css';

function ExploreButton({ title }) {
  const history = useHistory();
  const {
    toggleExplore,
    setToggleExplore,
    setSearchFilter,
    setInputSearch,
    setCreateCards,
    searchFilter,
    inputSearch,
    setComidas,
    setBebidas,
  } = useContext(MyContext);

  function changeToggle() {
    setToggleExplore(!toggleExplore);
  }

  function changeSearchFilter({ target }) {
    setSearchFilter(target.value);
  }

  function changeInputSearch({ target }) {
    setInputSearch(target.value);
  }

  async function requisitarReceitas() {
    let url = { name: 'thecocktaildb', id: 'idDrink', type: 'drinks' };
    if (title === 'Comidas') {
      url = { name: 'themealdb', id: 'idMeal', type: 'meals' };
    }
    const {
      tamanhoResposta,
      terminatedRequest,
    } = await requestApi(url, searchFilter, inputSearch);
    if (title === 'Comidas') {
      setComidas(terminatedRequest.meals);
    } else {
      setBebidas(terminatedRequest.drinks);
    }
    if (!tamanhoResposta || !terminatedRequest[url.type]) {
      // eslint-disable-next-line no-alert
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (terminatedRequest[url.type].length === 1) {
      history.push(`/${title.toLowerCase()}/${terminatedRequest[url.type][0][url.id]}`);
    } else {
      setCreateCards(true);
    }
  }

  function renderInput() {
    return (
      <div className="exploreContainer">
        <input
          type="text"
          placeholder="Buscar Receita"
          data-testid="search-input"
          onChange={ changeInputSearch }
        />
        <label htmlFor="ingredients">
          Ingredientes
          <input
            type="radio"
            value="ingredientes"
            name="ingredientes"
            id="ingredients"
            onChange={ changeSearchFilter }
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="nome">
          Nome
          <input
            type="radio"
            value="name"
            name="ingredientes"
            id="nome"
            onChange={ changeSearchFilter }
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="primeira">
          Primeira Letra
          <input
            type="radio"
            value="primeira"
            name="ingredientes"
            id="primeira"
            onChange={ changeSearchFilter }
            data-testid="first-letter-search-radio"
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ requisitarReceitas }
        >
          Buscar
        </button>
      </div>
    );
  }

  return (
    <>
      <button type="button" onClick={ changeToggle }>
        <img src={ searchIcon } alt="Search" data-testid="search-top-btn" />
      </button>
      { toggleExplore ? renderInput() : null }
    </>
  );
}

ExploreButton.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ExploreButton;
