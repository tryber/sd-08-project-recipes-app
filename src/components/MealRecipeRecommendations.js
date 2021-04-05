import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as mealApi from '../services/mealApi';

import Card from './Card';

import styles from '../styles/components/MealRecipeRecommendations.module.css';

const RECOMMENDATIONS_LIMIT = 6;

const MealRecipeRecommendations = () => {
  const history = useHistory();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    mealApi.getByName().then(({ meals }) => (
      setRecommendations(meals.slice(0, RECOMMENDATIONS_LIMIT))
    ));
  }, []);

  return (
    <div className={ styles.recommendations }>
      <h2>Recomendadas</h2>
      <div className={ styles.recommendationsContainer }>
        { recommendations.map((recommendation, index) => (
          <Card
            data-testid={ `${index}-recomendation-card` }
            key={ recommendation.idMeal }
            name={ recommendation.strMeal }
            thumbnail={ recommendation.strMealThumb }
            index={ index }
            category={ recommendation.strCategory }
            onClick={ () => history.push(
              `/comidas/${recommendation.idMeal}`,
            ) }
            recommendation
          />)) }
      </div>
    </div>
  );
};

export default MealRecipeRecommendations;
