import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getMealsDetails, getDrinksDetails } from '../services/getAPIs';
import CardInProgress from './CardInProgress';

function MealDrinkProgress({ type }) {
  const [recipe, setRecipe] = useState('');

  const { id } = useParams();

  const getRecipe = useCallback(() => {
    if (type === 'drink') {
      getDrinksDetails(id).then((response) => setRecipe(response[0]));
    }
    if (type === 'meal') {
      getMealsDetails(id).then((response) => setRecipe(response[0]));
    }
  }, [id, type]);

  useEffect(() => {
    getRecipe();
  }, [getRecipe]);

  return (
    <main>
      <CardInProgress recipe={ recipe } type={ type } />
    </main>
  );
}

MealDrinkProgress.propTypes = {
  type: PropTypes.string.isRequired,
};

export default MealDrinkProgress;
