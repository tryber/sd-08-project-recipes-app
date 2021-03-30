import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getResultFromAPI from '../api/getResultFromAPI';
import Details from '../components/Details';
import createIngredientsArray from '../services/createIngredientsArray';

function DetalhesComida() {
  const { id } = useParams();
  const [currentFood, setCurrentFood] = useState({});
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function getMeal() {
      const food = await getResultFromAPI('/comidas', 'lookup', id);
      setCurrentFood(food[0]);
      setIngredients(createIngredientsArray(food[0]));
    }
    getMeal();
  }, []);

  return (
    <Details currentFood={ currentFood } ingredients={ ingredients } />
  );
}

export default DetalhesComida;
