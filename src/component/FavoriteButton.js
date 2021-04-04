import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

import {
  getFavoriteRecipes,
  addFavoriteRecipe,
  removeFavoriteRecipe,
} from '../services/localStorage';
import StyledFavoriteButton from '../styles/component/FavoriteButton';

export default function FavoriteButton({ recipeInfo }) {
  const { id } = recipeInfo;

  const [isFavorite, setIsFavorite] = useState();

  useEffect(
    () => setIsFavorite(getFavoriteRecipes().find(({ id: recipeId }) => recipeId === id)),
    [setIsFavorite, id],
  );

  return (
    <StyledFavoriteButton
      type="button"
      data-testid="favorite-btn"
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      onClick={ () => {
        if (isFavorite) {
          removeFavoriteRecipe(id);
          setIsFavorite(false);
        } else {
          addFavoriteRecipe(recipeInfo);
          setIsFavorite(true);
        }
      } }
    >
      <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="share" />
    </StyledFavoriteButton>
  );
}

FavoriteButton.propTypes = {
  recipeInfo: PropTypes.objectOf(PropTypes.string).isRequired,
};
