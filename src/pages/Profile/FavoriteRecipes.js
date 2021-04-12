import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import share from '../../images/shareIcon.svg';
import favIconEnabled from '../../images/blackHeartIcon.svg';

class FavoriteRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipesSave: [],
      filter: 'All',
    };
    this.recoverFavorite = this.recoverFavorite.bind(this);
    this.disfavorRevenue = this.disfavorRevenue.bind(this);
    this.filterDone = this.filterDone.bind(this);
  }

  componentDidMount() {
    this.recoverFavorite();
  }

  componentDidUpdate(_, nextState) {
    const { filter } = this.state;
    if (nextState.filter !== filter) {
      return this.filterDone();
    }
  }

  recoverFavorite() {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    this.setState((state) => ({
      ...state,
      recipesSave: favorites,
    }));
  }

  filterDone() {
    const { filter } = this.state;
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (filter === 'All') {
      return this.setState((state) => ({
        ...state,
        recipesSave: favorites,
      }));
    }
    if (filter === 'drinks') {
      const favoriteDrinks = favorites.filter(
        (recipe) => recipe.type === 'bebida',
      );
      return this.setState((state) => ({
        ...state,
        recipesSave: favoriteDrinks,
      }));
    }
    const favoriteMeals = favorites.filter(
      (recipe) => recipe.type === 'comida',
    );
    return this.setState((state) => ({
      ...state,
      recipesSave: favoriteMeals,
    }));
  }

  disfavorRevenue(id) {
    console.log(id);
    const favorites = JSON.parse(localStorage.getItem('doneRecipes'));
    const UpdatedBookmarks = favorites.filter(
      (favoriteId) => favoriteId.id !== id,
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(UpdatedBookmarks));
    this.setState((state) => ({
      ...state,
      recipesSave: UpdatedBookmarks,
    }));
  }

  async copyLink(type, id) {
    await copy(`http://localhost:3000/${type}/${id}`);
    const link = document.createElement('span');
    link.innerHTML = 'Link copiado!';
    document.getElementById(`link-compartilhar-${id}`).appendChild(link);
  }

  render() {
    const { recipesSave } = this.state;
    return (
      <div>
        <Header title="Receitas Favoritas" />
        <div className="container">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => this.setState({ filter: 'All' }) }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => this.setState({ filter: 'drinks' }) }
          >
            Drinks
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => this.setState({ filter: 'foods' }) }
          >
            Food
          </button>
        </div>
        {recipesSave.map((recipe, index) => (recipe.type === 'comida' ? (

          <div key={ index }>
            <Link to={ `comidas/${recipe.id}` }>

              <button
                type="button"
              >
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.category }
                />
                <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
              </button>
            </Link>
            <h3 data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.area} - ${recipe.category}`}
            </h3>
            <span id={ `link-compartilhar-${recipe.id}` } />
            <button
              src={ share }
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => this.copyLink('comidas', recipe.id) }
            >
              <img src={ share } alt="share" />
            </button>
            <button
              src={ favIconEnabled }
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => this.disfavorRevenue(recipe.id) }
            >
              <img src={ favIconEnabled } alt="coracao" />
            </button>
          </div>

        ) : (
          <div key={ index }>
            <Link to={ `bebidas/${recipe.id}` }>

              <button
                type="button"
              >
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.category }
                />
                <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
              </button>
            </Link>
            <h3 data-testid={ `${index}-horizontal-top-text` }>
              {recipe.alcoholicOrNot}
            </h3>
            <span id={ `link-compartilhar-${recipe.id}` } />
            <button
              src={ share }
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => this.copyLink('bebidas', recipe.id) }
            >
              <img src={ share } alt="share" />
            </button>
            <button
              src={ favIconEnabled }
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => this.disfavorRevenue(recipe.id) }
            >
              <img src={ favIconEnabled } alt="black Heart Icon" />
            </button>
          </div>
        )))}
      </div>
    );
  }
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default FavoriteRecipes;
