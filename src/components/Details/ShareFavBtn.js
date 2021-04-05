import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import copy from 'clipboard-copy';
import { useIsMeal } from '../../services/customHooks';
import { loadFromStorage, saveOnStorage } from '../../services/utils';
import { saveFavorites } from '../../redux/actions/details';

import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function favConstructor(actualRecipe, isMeal) {
  if (isMeal) {
    return {
      id: actualRecipe.idMeal,
      type: 'comida',
      area: actualRecipe.strArea,
      category: actualRecipe.strCategory,
      alcoholicOrNot: '',
      name: actualRecipe.strMeal,
      image: actualRecipe.strMealThumb,
    };
  }
  return {
    id: actualRecipe.idDrink,
    type: 'bebida',
    area: '',
    category: actualRecipe.strCategory,
    alcoholicOrNot: actualRecipe.strAlcoholic,
    name: actualRecipe.strDrink,
    image: actualRecipe.strDrinkThumb,
  };
}

function filterRemoveRecipe(actualRecipe, favorites, isMeal) {
  if (favorites === null) return [];
  const notMatches = favorites.filter((e) => {
    if (isMeal) {
      return e.id !== actualRecipe.idMeal;
    }
    return e.id !== actualRecipe.idDrink;
  });
  return notMatches;
}

function filterMatchRecipe(actualRecipe, favorites, isMeal) {
  if (favorites === null) return [];
  return favorites.filter((e) => {
    if (isMeal) {
      return e.id === actualRecipe.idMeal;
    }
    return e.id === actualRecipe.idDrink;
  });
}

function isInFavorites(actualRecipe, favorites, isMeal) {
  const matches = filterMatchRecipe(actualRecipe, favorites, isMeal);
  if (matches.length < 1) {
    return false;
  }
  return true;
}

function favoriting(actualRecipe, favorites, isMeal, dispatch) {
  if (favorites.length < 1) {
    const newFavorites = [];
    newFavorites.push(favConstructor(actualRecipe, isMeal));
    dispatch(saveFavorites(newFavorites));
  } else if (isInFavorites(actualRecipe, favorites, isMeal)) {
    const filteredFavorites = filterRemoveRecipe(actualRecipe, favorites, isMeal);
    dispatch(saveFavorites(filteredFavorites));
  } else {
    const newFavorites = [...favorites];
    newFavorites.push(favConstructor(actualRecipe, isMeal));
    dispatch(saveFavorites(newFavorites));
  }
}

export default function ShareFavBtn() {
  const { id } = useParams();
  const { actualRecipe, favorites } = useSelector((state) => state.detailsReducer);
  const isMeal = useIsMeal();
  const [copied, setCopied] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const storageFav = loadFromStorage('favoriteRecipes');
    if (storageFav != null) {
      dispatch(saveFavorites(storageFav));
    }
  }, []);

  useEffect(() => {
    saveOnStorage('favoriteRecipes', favorites);
  }, [favorites]);

  let mealCocktail = '';

  if (isMeal) {
    mealCocktail = 'comidas';
  } else {
    mealCocktail = 'bebidas';
  }

  const isFavorite = isInFavorites(actualRecipe, favorites, isMeal);
  return (
    <div className="share-fav-btn">
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          copy(`http://localhost:3000/${mealCocktail}/${id}`);
          setCopied(true);
        } }
      >
        { copied && <span>Link copiado!</span> }
        <img src={ shareIcon } alt="Share Button" />
      </button>
      <button
        name="favoriteButton"
        type="button"
        data-testid="favorite-btn"
        onClick={ () => favoriting(actualRecipe, favorites, isMeal, dispatch) }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      >
        {
          isFavorite ? <img src={ blackHeartIcon } alt="Favorite Button" />
            : <img src={ whiteHeartIcon } alt="Favorite Button" />
        }
      </button>
    </div>
  );
}
