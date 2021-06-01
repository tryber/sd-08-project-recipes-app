import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import ListCard from '../components/ListCard';
import Footer from '../components/Footer';
import Filtros from '../components/Filtros';

export default class Drinks extends Component {
  render() {
    const { history: { push }, location: { pathname } } = this.props;
    const values = {
      name: 'Bebidas',
      url: {
        byIngredient: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
        byName: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
        byFirstLetter: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
      },
      defaultSearch: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    };
    const drinks = {
      id: 'idDrink',
      name: 'strDrink',
      thumb: 'strDrinkThumb',
      linkRedirect: '/bebidas/',
      history: push,
    };
    return (
      <div>
        <Header params={ values } />
        <Filtros pathname={ pathname } />
        <ListCard infos={ drinks } params={ values } />
        <Footer />
      </div>
    );
  }
}

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
