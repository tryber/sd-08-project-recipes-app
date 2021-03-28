import React from 'react';
import PropTypes from 'prop-types';
import { shareIcon, whiteHeartIcon } from '../constants/Icons';

const HeaderRecipeDetails = ({ imgPath, title, category }) => (
  <section>
    <img
      src={ imgPath }
      alt="recipe"
      className="image-details"
      data-testid="recipe-photo"
    />
    <h3 data-testid="recipe-title">{title}</h3>
    <h5 data-testid="recipe-category">{category}</h5>
    <input
      type="image"
      src={ shareIcon }
      alt="share icon"
      data-testid="share-btn"
    />
    <input
      type="image"
      src={ whiteHeartIcon }
      alt="white heart icon"
      data-testid="favorite-btn"
    />
  </section>
);

HeaderRecipeDetails.propTypes = {
  imgPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default HeaderRecipeDetails;
