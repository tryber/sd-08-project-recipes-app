import React from 'react';
import PropTypes from 'prop-types';

const SIX_FIRST_RESULTS = 6;
const VISIBLE = 'visible';
const NOT_VISIBLE = 'notVisible';

const CardCarousel = (props) => {
  const { foods, drinks } = props;

  let data;
  let thumb;
  let title;
  let category;

  if (foods) {
    data = foods;
    thumb = 'strMealThumb';
    title = 'strMeal';
    category = 'strCategory';
  }

  if (drinks) {
    data = drinks;
    thumb = 'strDrinkThumb';
    title = 'strDrink';
    category = 'strCategory';
  }

  return (
    <div className="recomendations-container">
      <button type="button" className="navegation-buttons">
        V
      </button>
      {data.slice(0, SIX_FIRST_RESULTS).map((recipe, index) => (
        index > 1
          ? (
            <div
              key={ index }
              data-testid={ `${index}-recomendation-card` }
              className={ NOT_VISIBLE }
            >
              <div>
                <img
                  className="recomendation-image"
                  src={ recipe[thumb] }
                  alt="recomendation-card-img"
                  data-testid="recipe-photo"
                />
                <h3 data-testid={ `${index}-recomendation-title` }>{recipe[title]}</h3>
                <p
                  data-testid={ `${index}-recomendation-category` }
                >
                  {recipe[category]}
                </p>
              </div>
            </div>
          ) : (
            <div
              key={ index }
              data-testid={ `${index}-recomendation-card` }
              className={ VISIBLE }
            >
              <div className="recomendation-cards">
                <img
                  className="recomendation-image"
                  src={ recipe[thumb] }
                  alt="recomendation-card-img"
                  data-testid="recipe-photo"
                />
                <h3 data-testid={ `${index}-recomendation-title` }>{recipe[title]}</h3>
                <p
                  data-testid={ `${index}-recomendation-category` }
                >
                  {recipe[category]}
                </p>
              </div>
            </div>
          )
      ))}
      <button type="button" className="navegation-buttons">
        P
      </button>
    </div>
  );
};

CardCarousel.propTypes = {
  foods: PropTypes.arrayOf({}),
}.isRequired;

export default CardCarousel;
