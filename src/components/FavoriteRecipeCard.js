import React, { Component } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class FavoriteRecipeCard extends Component {
  constructor() {
    super();
    this.filterElementFromStorage = this.filterElementFromStorage.bind(this);
  }

  filterElementFromStorage(event, id) {
    const { setFavoriteRecipes } = this.props;
    event.preventDefault();
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const newElements = favorites.filter((item) => item.id !== id);
    setFavoriteRecipes(newElements);
  }

  copyLink(id, type) {
    if (type === 'bebida') {
      copy(`http://localhost:3000/bebidas/${id}`);
      document.getElementById('link').style = 'inline';
    } else {
      copy(`http://localhost:3000/comidas/${id}`);
      document.getElementById('link').style = 'inline';
    }
  }

  render() {
    const { favoriteRecipes: {
      id,
      type,
      area,
      category,
      alcoholicOrNot,
      name,
      image,
    }, index } = this.props;

    return (
      <div
        data-testid={ `${index}-recipe-card` }
        className="favorite-container container d-flex white70 py-2 my-2"
      >
        {type === 'bebida' ? (
          <Link
            to={ `/bebidas/${id}` }
            className="d-flex"
          >
            <img
              style={ { width: '100px' } }
              src={ image }
              alt={ name }
              data-testid={ `${index}-horizontal-image` }
              className="favorite-img"
            />
            <p
              data-testid={ `${index}-horizontal-name` }
              className="my-1 mx-2 font-mountains txt-shdw1 text-dark h4"
            >
              { name }
            </p>
          </Link>
        ) : (
          <Link
            to={ `/comidas/${id}` }
            src={ image }
            className="d-flex"
          >
            <img
              style={ { width: '100px' } }
              src={ image }
              alt={ name }
              data-testid={ `${index}-horizontal-image` }
              className="favorite-img"
            />
            <div className="d-flex flex-column justify-content-center">
              <p
                data-testid={ `${index}-horizontal-name` }
                className="my-1 mx-2 font-mountains txt-shdw1 text-dark h4"
              >
                { name }
              </p>
              {type === 'bebida' ? (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                  className="my-1 mx-2 font-mountains txt-shdw1 text-dark h4"
                >
                  { alcoholicOrNot}
                </p>
              ) : (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                  className="my-1 mx-2 font-mountains txt-shdw1 text-dark h4"
                >
                  {`${area} - ${category}`}
                </p>
              )}
            </div>
          </Link>
        )}
        <button
          src={ blackHeartIcon }
          type="button"
          onClick={ (event) => this.filterElementFromStorage(event, id) }
          className="action-button btn mt-3 p-1"
        >
          <img
            src={ blackHeartIcon }
            data-testid={ `${index}-horizontal-favorite-btn` }
            alt="Favoritar/Desfavoritar"
            className="favorite-icon icon"
          />
        </button>
        <button
          type="button"
          onClick={ () => this.copyLink(id, type) }
          className="action-button btn mt-3 p-1"
        >
          <img
            src={ shareIcon }
            data-testid={ `${index}-horizontal-share-btn` }
            alt="Compartilhar receita"
            className="share-icon icon"
          />
        </button>
        <p id="link" style={ { display: 'none' } }>Link copiado!</p>
      </div>
    );
  }
}

FavoriteRecipeCard.propTypes = {
  favoriteRecipes: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  setFavoriteRecipes: PropTypes.func.isRequired,
};

export default FavoriteRecipeCard;
