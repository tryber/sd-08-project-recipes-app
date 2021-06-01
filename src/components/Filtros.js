import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchIngredient as fetchIngredientAction } from '../action';

class Filtros extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      filter: '',
    };

    this.fetchList = this.fetchList.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    this.fetchList();
  }

  handleFilter({ target }) {
    const { filter } = this.state;
    if (target.value === filter) {
      return this.setState(() => ({ filter: '' }), () => {
        this.submitSearch();
      });
    }
    this.setState(() => ({ filter: target.value }), () => this.submitSearch());
  }

  async fetchList() {
    const { pathname } = this.props;
    if (pathname === '/comidas') {
      const req = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const results = await req.json();
      this.setState({ results });
    }
    if (pathname === '/bebidas') {
      const req = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const results = await req.json();
      this.setState({ results });
    }
  }

  filterAll(pathname, searchIngredient) {
    const mealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    if (pathname === '/comidas') {
      return searchIngredient(mealUrl, true);
    }
    if (pathname === '/bebidas') {
      return searchIngredient(drinkUrl, true);
    }
  }

  submitSearch() {
    const { pathname, searchIngredient } = this.props;
    const { filter } = this.state;
    const mealUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`;
    const drinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`;
    if (pathname === '/comidas') {
      if (filter) return searchIngredient(mealUrl, true);
      return searchIngredient('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
    if (pathname === '/bebidas') {
      if (filter) return searchIngredient(drinkUrl, true);
      return searchIngredient('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
  }

  render() {
    const { results } = this.state;
    const { pathname, searchIngredient } = this.props;
    const result = results.meals || results.drinks;
    const TOTAL_ITEMS = 4;
    return (
      <nav>
        <button
          data-testid="All-category-filter"
          type="button"
          className="filter-buttons-search"
          onClick={ () => this.filterAll(pathname, searchIngredient) }
        >
          All
        </button>
        {results.length !== 0 && result.map((category, index) => {
          if (index > TOTAL_ITEMS) {
            return null;
          }
          return (
            <button
              data-testid={ `${category.strCategory}-category-filter` }
              key={ category.strCategory }
              type="button"
              className="filter-buttons-search"
              // onClick={ () => this.submitSearch(category.strCategory) }
              onClick={ this.handleFilter }
              value={ category.strCategory }
            >
              {category.strCategory}
            </button>
          );
        })}
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  searchIngredient: (url, filterButton) => dispatch(
    fetchIngredientAction(url, filterButton),
  ),
});

export default connect(null, mapDispatchToProps)(Filtros);

Filtros.propTypes = {
  pathname: PropTypes.string.isRequired,
  searchIngredient: PropTypes.func.isRequired,
};
