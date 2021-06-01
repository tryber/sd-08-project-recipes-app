import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';

import Header from '../components/Header';

export default class Explore extends Component {
  render() {
    const { history } = this.props;
    console.log(history, 'wasef');
    const values = {
      name: 'Explorar',
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
        <div>
          <button
            onClick={ () => history.push('/explorar/comidas') }
            data-testid="explore-food"
            type="button"
          >
            Explorar Comidas
          </button>
          <button
            onClick={ () => history.push('/explorar/bebidas') }
            data-testid="explore-drinks"
            type="button"
          >
            Explorar Bebidas
          </button>
        </div>
      </div>
    );
  }
}

Explore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

Explore.defaultProps = {
  history: undefined,
};
