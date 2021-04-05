import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import favoriteIconBlack from '../../images/blackHeartIcon.svg';
import { saveFavorites } from '../../redux/actions/details';

function FavoriteButton({ testid, recipeId }) {
  const dispatch = useDispatch();
  function removeFavorite(Id) {
    const favoritesFromLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = favoritesFromLocalStorage
      .filter((favorite) => favorite.id !== Id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    dispatch(saveFavorites(newFavorites));
  }

  return (
    <button onClick={ () => removeFavorite(recipeId) } type="button">
      <img data-testid={ testid } src={ favoriteIconBlack } alt="Favorite icon" />
    </button>
  );
}

FavoriteButton.propTypes = {
  testid: PropTypes.string.isRequired,
  recipeId: PropTypes.number.isRequired,
};

export default FavoriteButton;
