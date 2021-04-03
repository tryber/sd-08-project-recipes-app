import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fav from '../images/blackHeartIcon.svg';
import notFav from '../images/whiteHeartIcon.svg';
import { addFoodToFavorite } from '../helpers';

class FavoriteButton extends Component {
  constructor() {
    super();
    this.state = {
      favoriteRecipe: false,
    };
    this.favoriteThisItem = this.favoriteThisItem.bind(this);
  }

  favoriteThisItem() {
    const { currentRecipe } = this.props;
    const done = addFoodToFavorite(currentRecipe, 'bebida');
    this.setState({ favoriteRecipe: done });
  }

  render() {
    const { favoriteRecipe } = this.state;
    return (
      <div>
        <button
          type="button"
          onClick={ this.favoriteThisItem }
        >
          <img
            src={ favoriteRecipe ? fav : notFav }
            alt="share"
            data-testid="favorite-btn"
          />
        </button>
      </div>
    );
  }
}

FavoriteButton.propTypes = {
  currentRecipe: PropTypes.shape.isRequired,
};

export default FavoriteButton;
