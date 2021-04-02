import React from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

export default function HeaderItemPage({ item }) {
  return (
    <>
      <img
        src={ item.strMealThumb }
        alt={ item.strArea }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">
        {item.strMeal}
      </h1>
      <button data-testid="share-btn" type="button">
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      <button data-testid="favorite-btn" type="button">
        <img src={ whiteHeartIcon } alt="favorito" />
      </button>
      <h2 data-testid="recipe-category">{item.strCategory}</h2>
    </>
  );
}

HeaderItemPage.propTypes = {
  item: PropTypes.shape({
    strMealThumb: PropTypes.string.isRequired,
    strArea: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
  }).isRequired,
};
