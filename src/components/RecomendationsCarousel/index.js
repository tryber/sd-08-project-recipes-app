import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const RecomendationsCarousel = ({ recomendations }) => (
  <section>
    <div
      className="container"
    >
      {recomendations.map((receipe, index) => (
        <div
          className="slide"
          key={ receipe.idDrink ? receipe.idDrink : receipe.strMeal }
          data-testid={ `${index}-recomendation-card` }
        >
          <img
            src={ receipe.strDrinkThumb
              ? receipe.strDrinkThumb
              : receipe.strMealThumb }
            alt={ receipe.strDrink ? receipe.strDrink : receipe.strMeal }
            className="recipe-photo"
          />
          <h2
            data-testid={ `${index}-recomendation-title` }
          >
            { receipe.strDrink ? receipe.strDrink : receipe.strMeal }
          </h2>
        </div>
      ))}
    </div>
  </section>
);

RecomendationsCarousel.propTypes = {
  recomendations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecomendationsCarousel;
