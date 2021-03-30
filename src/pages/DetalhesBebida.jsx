import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getResultFromAPI from '../api/getResultFromAPI';
import Details from '../components/Details';
import createIngredientsArray from '../services/createIngredientsArray';

function DetalhesBebida() {
  const { id } = useParams();
  const [currentFood, setCurrentFood] = useState({});
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function getDrink() {
      const food = await getResultFromAPI('/bebidas', 'lookup', id);
      setCurrentFood(food[0]);
      setIngredients(createIngredientsArray(food[0]));
    }
    getDrink();
  }, []);

  return (
    <Details currentFood={ currentFood } ingredients={ ingredients } />
  );
}

export default DetalhesBebida;
