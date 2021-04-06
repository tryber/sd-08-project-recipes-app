/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import {
  checkFavoriteRecipes,
  saveFavoriteRecipe,
  removeFavoritedRecipe,
} from '../../services/localStorage';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const FavoriteButton = ({ id, recipe, type }) => {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    if (checkFavoriteRecipes(type, id)) setFavorited(true);
  }, [favorited]);

  return (
    <div>
      {favorited
        ? (
          <Button
            onClick={ () => {
              setFavorited(false);
              removeFavoritedRecipe(id);
            } }
          >
            <img
              src={ blackHeartIcon }
              style={ { width: 20 } }
              alt="black heart"
              data-testid="favorite-btn"
            />
          </Button>
        )
        : (
          <Button
            onClick={ () => {
              setFavorited(true);
              saveFavoriteRecipe(recipe);
            } }
          >
            <img
              src={ whiteHeartIcon }
              style={ { width: 20 } }
              alt="white heart"
              data-testid="favorite-btn"
            />
          </Button>
        )}
    </div>
  );
};

FavoriteButton.propTypes = {
  id: PropTypes.string.isRequired,
  recipe: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
};

export default FavoriteButton;
