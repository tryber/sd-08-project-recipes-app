import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { requestDrinkId } from '../../../services/API';
import DrinkContext from '../../../context/bebidaContext/DrinkContext';
import CardDrinkInProgress from '../../../components/Card/CardDrinkInProgress';

function BebidaProgresso() {
  const {
    functions: {
      setDetailsDrinks,
    },
  } = useContext(DrinkContext);

  const { idDaReceita } = useParams();

  useEffect(() => {
    const fetchDrink = async () => {
      const request = await requestDrinkId(idDaReceita);
      setDetailsDrinks(request.drinks);
    };
    fetchDrink();
  }, [setDetailsDrinks, idDaReceita]);

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
      <CardDrinkInProgress
        alreadyFavorited={ alreadyFavorited }
        idDaReceita={ idDaReceita }
      />
    </section>
  );
}

export default BebidaProgresso;
