import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { useIsMeal } from '../../services/customHooks';
import { fetchDetails, fetchDrinks, fetchMeal } from '../../services/API';
import { saveActualRecipe, saveRecommendations } from '../../redux/actions/details';
import { loadFromStorage, saveOnStorage } from '../../services/utils';
import './inProgress.css';

import Loading from '../../components/Details/Loading';
import CoverImg from '../../components/Details/CoverImg';
import Title from '../../components/Details/Title';
import ShareFavBtn from '../../components/Details/ShareFavBtn';
import StepList from '../../components/InProgress/StepList';
import InstructionsText from '../../components/Details/InstructionsText';

async function getRecipe(dispatch, id, isMeal) {
  let api = '';
  let recommendations = '';
  if (isMeal) {
    api = 'meal';
    recommendations = await fetchDrinks(null, 'firstFetch');
  } else {
    api = 'beverage';
    recommendations = await fetchMeal(null, 'firstFetch');
  }
  dispatch(saveRecommendations(recommendations));
  const actualRecipe = await fetchDetails(id, api);
  dispatch(saveActualRecipe(actualRecipe));
}

function Details() {
  const [redirect, setRedirect] = useState(false);
  const [done, setDone] = useState(false);
  const { actualRecipe } = useSelector((state) => state.detailsReducer);
  const isMeal = useIsMeal();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getRecipe(dispatch, id, isMeal);
  }, []);
  if (Object.keys(actualRecipe).length < 1) {
    return <Loading />;
  }

  function isDone(actualIngredients) {
    setDone(!actualIngredients.includes(false));
  }

  function favConstructor() {
    if (isMeal) {
      return {
        id: actualRecipe.idMeal,
        type: 'comida',
        area: actualRecipe.strArea,
        category: actualRecipe.strCategory,
        alcoholicOrNot: '',
        name: actualRecipe.strMeal,
        image: actualRecipe.strMealThumb,
        doneDate: Date.now(),
        tags: actualRecipe.strTags,
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
      doneDate: Date.now(),
      tags: actualRecipe.strTags,
    };
  }

  function returnNotMatches(doneRecipes) {
    if (doneRecipes === null) return [];
    return doneRecipes.filter((e) => {
      if (isMeal) {
        return e.id !== actualRecipe.idMeal;
      }
      return e.id !== actualRecipe.idDrink;
    });
  }

  function saveOnDoneRecipes() {
    const doneRecipes = loadFromStorage('doneRecipes');
    if (doneRecipes === null) {
      const newDone = [favConstructor()];
      saveOnStorage('doneRecipes', newDone);
    } else {
      const newDone = returnNotMatches(doneRecipes);
      newDone.push(favConstructor());
      saveOnStorage('doneRecipes', newDone);
    }
    setRedirect(true);
  }
  return (
    <main className="recipe-details">
      <CoverImg />
      <div className="upper-container">
        <Title />
        <ShareFavBtn />
      </div>
      <StepList isDone={ isDone } />
      <InstructionsText />
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ saveOnDoneRecipes }
        disabled={ !done }
      >
        Finalizar Receita
      </button>
      {redirect && <Redirect to="/receitas-feitas" />}
    </main>
  );
}

export default Details;
