import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchIngredient as fetchIngredientAction } from '../action';

import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import './Components.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isHidden: false,
      searchBy: '',
      text: '',

    };

    this.showSearchBar = this.showSearchBar.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  handleChange({ target }) {
    if (target.type === 'radio') this.setState({ searchBy: target.value });
    if (target.type === 'text') this.setState({ text: target.value });
  }

  showSearchBar() {
    const { isHidden } = this.state;
    this.setState({ isHidden: !isHidden });
  }

  submitSearch(searchIngredient) {
    const { params: { url: { byIngredient, byName, byFirstLetter } } } = this.props;
    const { text, searchBy } = this.state;
    if (text === '') return;
    if (searchBy === 'ingredient') {
      const url = byIngredient + text;
      return searchIngredient(url);
    } if (searchBy === 'name') {
      const url = byName + text;
      return searchIngredient(url);
    }
    if (text.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const url = byFirstLetter + text;
    return searchIngredient(url);
  }

  toggleSearchBar() {
    const { text } = this.state;
    const { searchIngredient } = this.props;
    return (
      <>
        <label htmlFor="search-input">
          <input
            className="teste"
            data-testid="search-input"
            type="text"
            name="search-input"
            id="search-input"
            value={ text }
            onChange={ this.handleChange }
          />
        </label>
        <div className="radios">
          <label htmlFor="ingrediente">
            <input
              type="radio"
              name="radio-search"
              id="ingredient"
              onChange={ this.handleChange }
              value="ingredient"
              data-testid="ingredient-search-radio"
            />
            Ingrediente
          </label>
          <label htmlFor="name">
            <input
              type="radio"
              name="radio-search"
              id="name"
              onChange={ this.handleChange }
              value="name"
              data-testid="name-search-radio"
            />
            Nome
          </label>
          <label htmlFor="first-letter">
            <input
              type="radio"
              name="radio-search"
              id="first-letter"
              onChange={ this.handleChange }
              value="first-letter"
              data-testid="first-letter-search-radio"
            />
            Primeira Letra
          </label>
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ () => this.submitSearch(searchIngredient) }
          >
            {' '}
            Buscar
          </button>
        </div>
      </>
    );
  }

  render() {
    const { params: { name } } = this.props;
    const { isHidden } = this.state;

    return (
      <>
        <nav className="header">
          <Link to="/perfil">
            <img data-testid="profile-top-btn" src={ ProfileIcon } alt="Profile icon" />
          </Link>
          <h2 data-testid="page-title">{name}</h2>
          <button
            type="button"
            onClick={ this.showSearchBar }
          >
            <img data-testid="search-top-btn" src={ SearchIcon } alt="Search Icon" />
          </button>
        </nav>
        {isHidden && this.toggleSearchBar()}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  searchIngredient: (url) => dispatch(fetchIngredientAction(url)),
});

export default connect(null, mapDispatchToProps)(Header);

Header.propTypes = {
  params: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.shape({
      byIngredient: PropTypes.string,
      byName: PropTypes.string,
      byFirstLetter: PropTypes.string,
    }),
    defaultSearch: PropTypes.string,
  }),
  searchIngredient: PropTypes.func.isRequired,
};

Header.defaultProps = {
  params: {
    url: {
      byIngredient: '',
      byName: '',
      byFirstLetter: '',
    },
    defaultSearch: '',
  },
};
