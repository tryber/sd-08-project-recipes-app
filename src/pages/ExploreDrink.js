import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';

import Header from '../components/Header';

export default class ExploreDrink extends Component {
  constructor() {
    super();
    this.surprise = this.surprise.bind(this);
  }

  async surprise() {
    const { history } = this.props;
    const req = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const results = await req.json();
    console.log(results.drinks[0].idDrink);
    history.push(`/bebidas/${results.drinks[0].idDrink}`);
  }

  render() {
    const { history } = this.props;
    const values = {
      name: 'Explorar Bebidas',
      url: {
        byIngredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
        byName: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
        byFirstLetter: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
      },
    };

    return (
      <div>
        <Header params={ values } />
        <Footer />
        <button
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </button>
        <button
          onClick={ () => this.surprise() }
          data-testid="explore-surprise"
          type="button"
        >
          Me Surpreenda!
        </button>
      </div>
    );
  }
}

ExploreDrink.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

ExploreDrink.defaultProps = {
  history: undefined,
};
