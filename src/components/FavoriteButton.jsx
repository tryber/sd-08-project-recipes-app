import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { checkFavoritesLocal, addFavoritesLocal,
  removeFavoritesLocal } from '../services/favoritesLocalStorage';

const FavoriteButton = (props) => {
  const [changeButton, setChangeButton] = useState(true);
  const { pathname } = useLocation();
  const pathAndId = pathname.match(/(\/[comidas||bebidas]+)\/([0-9]+)+/);
  const { currentFood } = props;
  const typeRecipe = {
    '/comidas': 'comida',
    '/bebidas': 'bebida',
  };

  useEffect(() => {
    setChangeButton(checkFavoritesLocal(pathAndId[2]));
  }, []);

  function generateFavoriteObject(food) {
    const objList = {
      id: food.idMeal || food.idDrink,
      type: typeRecipe[pathAndId[1]],
      area: food.strArea || '',
      category: food.strCategory,
      alcoholicOrNot: food.strAlcoholic || '',
      name: food.strMeal || food.strDrink,
      image: food.strMealThumb || food.strDrinkThumb,
    };
    return objList;
  }

  function favRecipesBtn() {
    if (changeButton) {
      removeFavoritesLocal(pathAndId[2]);
      setChangeButton(false);
    } else {
      addFavoritesLocal(generateFavoriteObject(currentFood));
      setChangeButton(true);
    }
  }

  return (
    <input
      type="image"
      src={ changeButton ? blackHeartIcon : whiteHeartIcon }
      alt="share"
      data-testid="favorite-btn"
      onClick={ favRecipesBtn }
    />

  );
};

FavoriteButton.propTypes = {
  currentFood: PropTypes.objectOf.isRequired,
};

export default FavoriteButton;
