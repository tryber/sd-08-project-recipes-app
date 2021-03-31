import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import setFavoritos, { isfavoriteRecipe } from '../services/setFavoritos';

function FavoriteBtn({ objDetail, urlText, id }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    isfavoriteRecipe(id, setIsFavorite);
  }, []);

  const removeFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const updatedFavorites = favoriteRecipes.filter((elem) => elem.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    isfavoriteRecipe(id, setIsFavorite);
  };

  const onClickFavorite = () => {
    if (isFavorite === true) {
      return removeFavorite();
    }
    return setFavoritos(objDetail[0], urlText, id, setIsFavorite);
  };

  return (
    <input
      className="favorite-btn"
      onClick={ () => onClickFavorite() }
      type="image"
      data-testid="favorite-btn"
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      alt="foto do item"
    />
  );
}

FavoriteBtn.propTypes = {
  objDetail: PropTypes.shape(
    PropTypes.any,
  ).isRequired,
  urlText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default FavoriteBtn;
