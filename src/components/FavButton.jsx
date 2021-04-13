import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../actions/recipes';
import FavIcon from '../images/whiteHeartIcon.svg';
import BlackFavIcon from '../images/blackHeartIcon.svg';

function FavButton({ // type,
  recipe, index }) {
  const favorite = useSelector((state) => state.recipes.favorite);
  const dispatch = useDispatch();
  // const formatedType = type === 'Meal' ? 'comida' : 'bebida';

  const handleClick = () => {
    const fav = favorite
      .find(
        ({ id, type }) => recipe.id === id && type === recipe.type, // type.startsWith(currRec.type),
      );
    const { id, area, category, alcoholicOrNot, name, image, type } = recipe;
    const favObj = { id, area, category, alcoholicOrNot, name, image, type };
    if (fav) {
      dispatch(removeFavorite(favObj));
    } else dispatch(addFavorite(favObj));
  };

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
  }, [favorite]);

  return (
    <button type="button" onClick={ handleClick }>
      <img
        alt="favorite"
        data-testid={ index !== undefined
          ? `${index}-horizontal-favorite-btn` : 'favorite-btn' }
        src={ favorite
          .some(({ id, type }) => recipe.id === id && type === recipe.type) // type.startsWith(rec.type))
          ? BlackFavIcon : FavIcon }
        style={ { width: '6vw' } }
      />
    </button>
  );
}

FavButton.propTypes = {
  recipe: PropTypes.shape().isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default FavButton;
