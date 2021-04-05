import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import copy from 'clipboard-copy';
import useDrinkDetailsHook from '../hooks/useDrinkDetailsHook';
import useFavoritesHook from '../hooks/useFavoritesHook';
import DrinkDetailsInfo from '../../components/DrinkDetailsInfo';

const initialInProgressRecipesValue = { cocktails: {}, meals: {} };

function DrinkDetails(props) {
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
    strDrinkThumb,
    strDrink,
    strCategory,
    strInstructions,
    strAlcoholic,
    isDone,
    ingredientsAndMeasuresList,
  ] = useDrinkDetailsHook();

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  }, []);

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

  // effect In Progress => voltar para ca caso de errado
  const addDrinkInProgress = (recipe) => {
    const { cocktails } = inProgressRecipes;
    const newFoodInProgress = {
      cocktails: Object.assign(cocktails, recipe),
      meals: inProgressRecipes.meals,
    };
    return setInProgressRecipes(newFoodInProgress);
  };

  useEffect(() => {
    function checkIsInProgress(idNumber) {
      const { cocktails } = inProgressRecipes;
      if (Object.keys(cocktails).includes(idNumber)) {
        return setIsInProgress(true);
      }
      return setIsInProgress(false);
    }
    checkIsInProgress(id);
  });

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
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    updateFavorites(newRecipe, isFavorite);
    setIsFavorite(!isFavorite);
  }

  function handleStartRecipeClick() {
    const newDrinkInProgress = {
      [id]: ingredientsAndMeasuresList,
    };
    addDrinkInProgress(newDrinkInProgress);
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
      { shouldRedirect && <Redirect
        to={ { pathname: `/bebidas/${id}/in-progress`,
        } }
      /> }
      {strDrink && <DrinkDetailsInfo
        copied={ copied }
        strCategory={ strCategory }
        strAlcoholic={ strAlcoholic }
        handleFavorite={ handleFavorite }
        isFavorite={ isFavorite }
        strDrink={ strDrink }
        strDrinkThumb={ strDrinkThumb }
        handleClick={ handleClick }
        ingredientsAndMeasuresList={ ingredientsAndMeasuresList }
        strInstructions={ strInstructions }

      />}
      { isDone ? '' : renderButton() }

    </>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinkDetails;
