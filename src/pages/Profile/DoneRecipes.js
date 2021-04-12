import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import { Header } from '../../components';
import share from '../../images/shareIcon.svg';

class DoneRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipesMade: [],
      filter: 'All',
    };
    this.recoverDone = this.recoverDone.bind(this);
    this.filterDone = this.filterDone.bind(this);
    this.copyLink = this.copyLink.bind(this);
  }

  componentDidMount() {
    this.recoverDone();
  }

  componentDidUpdate(_, nextState) {
    const { filter } = this.state;
    if (nextState.filter !== filter) {
      return this.filterDone();
    }
  }

  recoverDone() {
    const done = JSON.parse(localStorage.getItem('doneRecipes'));
    this.setState((state) => ({
      ...state,
      recipesMade: done,
    }));
  }

  filterDone() {
    const { filter } = this.state;
    const done = JSON.parse(localStorage.getItem('doneRecipes'));
    if (filter === 'All') {
      return this.setState((state) => ({
        ...state,
        recipesMade: done,
      }));
    }
    if (filter === 'drinks') {
      const doneDrinks = done.filter(
        (recipe) => recipe.type === 'bebida',
      );
      return this.setState((state) => ({
        ...state,
        recipesMade: doneDrinks,
      }));
    }
    const doneMeals = done.filter(
      (recipe) => recipe.type === 'comida',
    );
    return this.setState((state) => ({
      ...state,
      recipesMade: doneMeals,
    }));
  }

  async copyLink(type, id) {
    await copy(`http://localhost:3000/${type}/${id}`);
    const link = document.createElement('span');
    link.innerHTML = 'Link copiado!';
    document.getElementById(`link-compartilhar-${id}`).appendChild(link);
  }

  render() {
    const { recipesMade } = this.state;
    return (
      <div>
        <Header title="Receitas Feitas" />
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
        {recipesMade.map((recipe, index) => (recipe.type === 'comida' ? (
          <div>
            <Link to={ `comidas/${recipe.id}` }>

              <button
                src={ recipe.image }
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
            <h3 data-testid={ `${index}-horizontal-done-date` }>
              {recipe.doneDate}
            </h3>
            <h3 data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }>
              {recipe.tags[0]}
            </h3>
            <h3 data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }>
              {recipe.tags[1]}
            </h3>
            <span id={ `link-compartilhar-${recipe.id}` } />
            <button
              src={ share }
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => this.copyLink('comidas', recipe.id)
              && console.log('comidas', recipe.id) }
            >
              <img src={ share } alt="black Heart Icon" />
            </button>
          </div>
        ) : (
          <div key={ index }>
            <Link to={ `bebidas/${recipe.id}` }>

              <button
                src={ recipe.image }
                type="button"
              >
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.category }
                />
                <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
              </button>
              <h3 data-testid={ `${index}-horizontal-top-text` }>
                {recipe.alcoholicOrNot}
              </h3>
            </Link>
            <h3 data-testid={ `${index}-horizontal-done-date` }>
              {recipe.doneDate}
            </h3>
            <span id={ `link-compartilhar-${recipe.id}` } />
            <button
              onClick={ () => this.copyLink('bebidas', recipe.id)
              && console.log('bebidas', recipe.id) }
              src={ share }
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
            >
              <img src={ share } alt="black Heart Icon" />
            </button>
          </div>
        )))}
      </div>
    );
  }
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default DoneRecipes;
