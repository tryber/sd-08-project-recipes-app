import React from 'react';
import PropTypes from 'prop-types';
import likedBtn from '../images/blackHeartIcon.svg';

export default function FavoritePageLikeBtn({
  dataTestId,
  recipeId,
  reRender,
  setReRender,
}) {
  const recipeStorage = (localStorage.getItem('favoriteRecipes'))
    ? JSON.parse(localStorage.getItem('favoriteRecipes'))
    : [];

  function handleClick() {
    localStorage.setItem('favoriteRecipes', JSON
      .stringify(recipeStorage.filter((e) => e.id !== recipeId)));
    setReRender(!reRender);
  }

  return (
    <button
      type="button"
      onClick={ handleClick }
      className="share-like-btn"
    >
      <img
        alt="like-icon"
        src={ likedBtn }
        data-testid={ dataTestId }

      />
    </button>
  );
}

FavoritePageLikeBtn.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
  reRender: PropTypes.bool.isRequired,
  setReRender: PropTypes.func.isRequired,
};
