import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Creators as FavoriteRecipesActions } from '../store/ducks/favoriteRecipes';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import styles from '../styles/components/RecipeHeader.module.css';

const copy = require('clipboard-copy');

const TWO_SECONDS = 2000;

const RecipeHeader = ({ title, category, handleFavorite,
  favoriteRecipes, id, removeFavorite }) => {
  const copiedLink = useRef();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favoriteRecipes.some((recipe) => recipe.id === id));
  });

  function handleShowCopiedAlert() {
    copy(window.location.href.replace('/in-progress', ''));
    copiedLink.current.style.display = 'block';
    setTimeout(() => {
      copiedLink.current.style.display = 'none';
    }, TWO_SECONDS);
  }

  function handleRemoveFavorite() {
    removeFavorite(id);
  }

  return (
    <div className={ styles.header }>
      <div className={ styles.copiedLink } ref={ copiedLink }>Link copiado!</div>
      <div className={ styles.row }>
        <h2 data-testid="recipe-title">{ title }</h2>
        <div className={ styles.controls }>
          <button
            type="button"
            onClick={ handleShowCopiedAlert }
          >
            <img
              data-testid="share-btn"
              src={ shareIcon }
              alt="Share Icon"
            />
          </button>
          <button
            type="button"
            onClick={ isFavorite ? handleRemoveFavorite : handleFavorite }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="Share Icon"
            />
          </button>
        </div>
      </div>
      <p
        className={ styles.category }
        data-testid="recipe-category"
      >
        { category }
      </p>
    </div>
  );
};

RecipeHeader.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  favoriteRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ favoriteRecipes }) => ({
  favoriteRecipes: favoriteRecipes.favoriteRecipes,
});

const mapDispatchToProps = (dispatch) => ({
  removeFavorite: (id) => dispatch(FavoriteRecipesActions.removeRecipe(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeHeader);
