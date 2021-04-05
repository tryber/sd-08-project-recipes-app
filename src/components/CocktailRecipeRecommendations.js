import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as cocktailApi from '../services/cocktailApi';

import Card from './Card';

import styles from '../styles/components/MealRecipeRecommendations.module.css';

const RECOMMENDATIONS_LIMIT = 6;

const CocktailRecipeRecommendations = () => {
  const history = useHistory();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    cocktailApi.getByName().then(({ drinks }) => (
      setRecommendations(drinks.slice(0, RECOMMENDATIONS_LIMIT))
    ));
  }, []);

  return (
    <div className={ styles.recommendations }>
      <h2>Recomendadas</h2>
      <div className={ styles.recommendationsContainer }>
        { recommendations.map((recommendation, index) => (
          <Card
            data-testid={ `${index}-recomendation-card` }
            key={ recommendation.idDrink }
            name={ recommendation.strDrink }
            thumbnail={ recommendation.strDrinkThumb }
            index={ index }
            category={ recommendation.strAlcoholic }
            onClick={ () => history.push(
              `/bebidas/${recommendation.idDrink}`,
            ) }
            recommendation
          />)) }
      </div>
    </div>
  );
};

export default CocktailRecipeRecommendations;
