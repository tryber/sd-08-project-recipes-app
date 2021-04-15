import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { requestFoodId } from '../../../services/API';
import FoodContext from '../../../context/comidaContext/FoodContext';
import CardFoodInProgress from '../../../components/Card/CardFoodInProgress';

function ComidaProgresso() {
  const {
    functions: {
      setDetailsFoods,
    },
  } = useContext(FoodContext);

  const { idDaReceita } = useParams();

  useEffect(() => {
    const fetchFood = async () => {
      const request = await requestFoodId(idDaReceita);
      setDetailsFoods(request.meals);
    };
    fetchFood();
  }, [setDetailsFoods, idDaReceita]);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    if (localStorage.getItem('inProgressRecipes') === null) {
      const obj = { cocktails: {}, meals: {} };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
    if (localStorage.getItem('checkedItems') === null) {
      localStorage.setItem('checkedItems', JSON.stringify({}));
    }
  }, []);

  let alreadyFavorited = false;
  if (JSON.parse(localStorage.getItem('favoriteRecipes') !== null)) {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    alreadyFavorited = favorites.some((obj) => obj.id === idDaReceita);
  }

  return (
    <section>
      <CardFoodInProgress
        alreadyFavorited={ alreadyFavorited }
        idDaReceita={ idDaReceita }
      />
    </section>
  );
}

export default ComidaProgresso;
