import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { requestMealRecipe, requestDrinkId } from '../../../services/API';
import DrinkContext from '../../../context/bebidaContext/DrinkContext';
import CardDrinkDetails from '../../../components/Card/CardDrinkDetails';
import FoodRecomendation from '../../../components/Carousel/FoodRecomendation';

function BebidaDetalhes() {
  const {
    functions: {
      setDetailsDrinks,
      setRecomendations,
    },
  } = useContext(DrinkContext);

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
    const fetchDrink = async () => {
      const request = await requestDrinkId(idDaReceita);
      setDetailsDrinks(request.drinks);
    };
    fetchDrink();
  }, [setDetailsDrinks, idDaReceita]);

  useEffect(() => {
    const fetchMeals = async () => {
      const request = await requestMealRecipe();
      setRecomendations(request.meals);
    };
    fetchMeals();
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
          <CardDrinkDetails
            alreadyFavorited={ alreadyFavorited }
            idDaReceita={ idDaReceita }
          />
          <FoodRecomendation />
        </>
      )}
    </section>
  );
}

export default BebidaDetalhes;
