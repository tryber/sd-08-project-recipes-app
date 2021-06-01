import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import ItemsDetails from './ItemsDetails';

export default class Item extends Component {
  constructor() {
    super();
    this.state = {
      results: '',
    };

    this.fetchRecipe = this.fetchRecipe.bind(this);
    this.renderMeal = this.renderMeal.bind(this);
  }

  componentDidMount() {
    this.fetchRecipe();
  }

  async fetchRecipe() {
    const { location: { pathname } } = this.props;
    const id = pathname.split('/')[2];
    const type = pathname.split('/')[1];
    if (type === 'comidas') {
      const req = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { meals } = await req.json();
      this.setState({ results: meals });
    }
    if (type === 'bebidas') {
      const req = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { drinks } = await req.json();
      this.setState({ results: drinks });
    }
  }

  renderMeal() {
    const { location: { pathname }, history } = this.props;
    const type = pathname.split('/')[1];
    const { results } = this.state;
    if (results && results.length === 0) return (<Redirect to={ `/${type}` } />);
    return (
      <div>
        {
          type === 'bebidas'
          && results
          && <ItemsDetails
            type="Drink"
            pathname={ pathname }
            history={ history }
            result={ results[0] }
          />

        }
        {
          type === 'comidas' && results
          && <ItemsDetails
            type="Meal"
            pathname={ pathname }
            history={ history }
            result={ results[0] }
          />
        }
      </div>
    );
  }

  render() {
    const { results } = this.state;
    if (results === '') return null;
    return (
      <>
        {this.renderMeal()}
      </>
    );
  }
}

Item.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.number,
    PropTypes.object,
  ])).isRequired,
};
