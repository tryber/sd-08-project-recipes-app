import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';

import Header from '../components/Header';

export default class Perfil extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
    };
    this.email = this.email.bind(this);
    this.remover = this.remover.bind(this);
  }

  componentDidMount() {
    this.email();
  }

  email() {
    const user = localStorage.getItem('user');
    let email = '';
    if (user) email = JSON.parse(user).email;
    console.log(email);
    this.setState({ user: email });
  }

  remover() {
    const { history } = this.props;
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
    console.log('entrou');
  }

  render() {
    const { history } = this.props;
    const { user } = this.state;
    const values = {
      name: 'Perfil',
      url: {
        byIngredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
        byName: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
        byFirstLetter: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
      },
    };

    return (
      <div>
        <Header params={ values } />
        <span data-testid="profile-email">{user}</span>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => this.remover() }
        >
          Sair
        </button>
        <Footer />
      </div>
    );
  }
}

Perfil.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

Perfil.defaultProps = {
  history: undefined,
};
