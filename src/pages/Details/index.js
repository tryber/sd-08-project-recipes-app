import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useIsMeal } from '../../services/customHooks';
import { fetchDetails, fetchDrinks, fetchMeal } from '../../services/API';
import { saveActualRecipe, saveRecommendations } from '../../redux/actions/details';
import './details.css';

import Loading from '../../components/Details/Loading';
import CoverImg from '../../components/Details/CoverImg';
import Title from '../../components/Details/Title';
import ShareFavBtn from '../../components/Details/ShareFavBtn';
import IngredientsList from '../../components/Details/IngredientsList';
import InstructionsText from '../../components/Details/InstructionsText';
import YTVideo from '../../components/Details/YTVideo';
import Recommendations from '../../components/Details/Recommendations';
import DynamicButton from '../../components/Details/DynamicButton';

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
  return (
    <main className="recipe-details">
      <CoverImg />
      <div className="upper-container">
        <Title />
        <ShareFavBtn />
      </div>
      <IngredientsList />
      <InstructionsText />
      { isMeal && <YTVideo /> }
      <Recommendations />
      <DynamicButton />
    </main>
  );
}

export default Details;
