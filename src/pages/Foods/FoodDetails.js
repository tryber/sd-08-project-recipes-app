import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import copy from 'clipboard-copy';
import useFoodDetailsHook from '../hooks/useFoodDetailsHook';

import './FoodDetail.css';

import useFavoritesHook from '../hooks/useFavoritesHook';
import FoodDetailsInfo from '../../components/FoodDetailsInfo';

const initialInProgressRecipesValue = { cocktails: {}, meals: {} };

function FoodDetails(props) {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { match: { params: { id } } } = props;
  const [favorites, updateFavorites] = useFavoritesHook();
  const [inProgressRecipes,
    setInProgressRecipes] = useState(initialInProgressRecipesValue);
  const [isInProgress, setIsInProgress] = useState(false);
  const [
    setId,
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
    strArea,
    isDone,
    ingredientsAndMeasuresList,
  ] = useFoodDetailsHook();

  useEffect(() => {
    setId(id);
  }, [id, setId]);

  useEffect(() => {
    const localData = localStorage.getItem('inProgressRecipes');
    const inProgress = localData ? JSON.parse(localData) : initialInProgressRecipesValue;
    setInProgressRecipes(inProgress);
  }, []);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

  useEffect(() => {
    function checkIsInProgress(idNumber) {
      const { meals } = inProgressRecipes;
      if (Object.keys(meals).includes(idNumber)) {
        return setIsInProgress(true);
      }
      return setIsInProgress(false);
    }
    checkIsInProgress(id);
  });

  const addFoodInProgress = (recipe) => {
    const { meals, cocktails } = inProgressRecipes;
    const newFoodInProgress = {
      cocktails,
      meals: Object.assign(meals, recipe),
    };
    return setInProgressRecipes(newFoodInProgress);
  };

  useEffect(() => {
    function checkIsFavorite() {
      return favorites
        .find((fav) => fav.id === id)
        ? setIsFavorite(true)
        : setIsFavorite(false);
    }
    checkIsFavorite();
  }, [id, favorites]);

  function handleClick() {
    copy(window.location.href);
    setCopied(true);
  }

  function handleFavorite() {
    const newRecipe = {
      id,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    updateFavorites(newRecipe, isFavorite);
    setIsFavorite(!isFavorite);
  }

  function handleStartRecipeClick() {
    const newFoodInProgress = {
      [id]: ingredientsAndMeasuresList,
    };
    addFoodInProgress(newFoodInProgress);
    setShouldRedirect(true);
  }

  function renderButton() {
    return (
      <button
        className="start-btn"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleStartRecipeClick }
      >
        { isInProgress ? 'Continuar Receita' : 'Iniciar' }
      </button>
    );
  }

  return (
    <>
      { shouldRedirect && <Redirect to={ `/comidas/${id}/in-progress` } /> }
      {strMeal && <FoodDetailsInfo
        copied={ copied }
        strMeal={ strMeal }
        strCategory={ strCategory }
        handleClick={ handleClick }
        handleFavorite={ handleFavorite }
        isFavorite={ isFavorite }
        strMealThumb={ strMealThumb }
        strYoutube={ strYoutube }
        strInstructions={ strInstructions }
        ingredientsAndMeasuresList={ ingredientsAndMeasuresList }
      />}
      { isDone ? '' : renderButton() }
    </>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FoodDetails;
