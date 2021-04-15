import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { requestDrinkRecipe, requestFoodId } from '../../../services/API';
import FoodContext from '../../../context/comidaContext/FoodContext';
import CardFoodDetails from '../../../components/Card/CardFoodDetails';
import DrinkRecomendation from '../../../components/Carousel/DrinkRecomendation';

function ComidaDetalhes() {
  const {
    functions: {
      setDetailsFoods,
      setRecomendations,
    },
  } = useContext(FoodContext);

  const { idDaReceita } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    if (localStorage.getItem('inProgressRecipes') === null) {
      const obj = { cocktails: {}, meals: {} };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
    if (localStorage.getItem('doneRecipes') === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchFood = async () => {
      const request = await requestFoodId(idDaReceita);
      setDetailsFoods(request.meals);
    };
    fetchFood();
  }, [setDetailsFoods, idDaReceita]);

  useEffect(() => {
    const fetchDrinks = async () => {
      const request = await requestDrinkRecipe();
      setRecomendations(request.drinks);
    };
    fetchDrinks();
  }, [setRecomendations]);

  let alreadyFavorited = false;
  if (JSON.parse(localStorage.getItem('favoriteRecipes') !== null)) {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    alreadyFavorited = favorites.some((obj) => obj.id === idDaReceita);
  }

  return (
    <section>
      {!loading
      && (
        <>
          <CardFoodDetails
            alreadyFavorited={ alreadyFavorited }
            idDaReceita={ idDaReceita }
          />
          <DrinkRecomendation />
        </>)}
    </section>

  );
}

export default ComidaDetalhes;
