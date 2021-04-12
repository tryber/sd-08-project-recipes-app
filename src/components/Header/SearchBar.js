import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDrinksBySearch, getMealsBySearch } from '../../store/actions';
import { alertSearch } from '../../serviceWorker';
import '../../styles/components/Header/SearchBar.css';

const ONE_LETTER = 1;
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      searchRadio: 'name',

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { search, searchRadio } = this.state;
    const { getMealsRadio, getDrinksRadio, title } = this.props;
    if (searchRadio === 'firstLetter'
    && search.length > ONE_LETTER) return alertSearch('14');
    const getFilterCheckBox = title === 'Comidas'
      ? getMealsRadio
      : getDrinksRadio;
    getFilterCheckBox({ search, searchRadio });
  }

  render() {
    const { search, searchRadio } = this.state;
    return (
      <div className="searchBarContainer">
        <div>
          <input
            name="search"
            type="search"
            data-testid="search-input"
            value={ search }
            onChange={ this.handleChange }
          />
        </div>
        <div className="searchBarRadios">
          <label htmlFor="searchRadio">
            <input
              value="ingredient"
              name="searchRadio"
              type="radio"
              data-testid="ingredient-search-radio"
              onChange={ this.handleChange }
              checked={ searchRadio === 'ingredient' }
            />
            Ingredientes
          </label>
          <label htmlFor="searchRadio">
            <input
              value="name"
              name="searchRadio"
              type="radio"
              data-testid="name-search-radio"
              onChange={ this.handleChange }
              checked={ searchRadio === 'name' }
            />
            Nome
          </label>
          <label htmlFor="searchRadio">
            <input
              value="firstLetter"
              name="searchRadio"
              type="radio"
              data-testid="first-letter-search-radio"
              onChange={ this.handleChange }
              checked={ searchRadio === 'firstLetter' }
            />
            Primeira Letra
          </label>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ this.handleClick }
        >
          Buscar
        </button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  getMealsRadio: PropTypes.func,
  getDrinksRadio: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  getMealsRadio: (radio) => dispatch(getMealsBySearch(radio)),
  getDrinksRadio: (radio) => dispatch(getDrinksBySearch(radio)),
});

export default connect(null, mapDispatchToProps)(SearchBar);
