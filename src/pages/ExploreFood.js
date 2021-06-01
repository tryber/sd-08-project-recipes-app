import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';

import Header from '../components/Header';

export default class ExploreFood extends Component {
  constructor() {
    super();
    this.supresa = this.supresa.bind(this);
  }

  async supresa() {
    const { history } = this.props;
    const req = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const results = await req.json();
    console.log(results.meals[0].idMeal);
    history.push(`/comidas/${results.meals[0].idMeal}`);
  }

  render() {
    const { history } = this.props;
    const values = {
      name: 'Explorar Comidas',
      url: {
        byIngredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
        byName: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
        byFirstLetter: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
      },
      defaultSearch: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    };

    return (
      <div>
        <Header params={ values } />
        <Footer />
        <button
          onClick={ () => history.push('/explorar/comidas/area') }
          data-testid="explore-by-area"
          type="button"
        >
          Por Local de Origem
        </button>
        <button
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </button>
        <button
          onClick={ () => this.supresa() }
          data-testid="explore-surprise"
          type="button"
        >
          Me Surpreenda!
        </button>
      </div>
    );
  }
}

ExploreFood.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

ExploreFood.defaultProps = {
  history: undefined,
};
