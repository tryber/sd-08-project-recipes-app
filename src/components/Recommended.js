import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import Context from '../context/Context';

function Recommended({ recipeType }) {
  const { recommendations } = useContext(Context);
  const SIX_RECOMMENDATIONS = 6;

  return (
    <section>
      <h5>Recomendadas</h5>
      <Carousel>
        { recipeType === 'Drink' ? (
          recommendations[0].meals && recommendations[0].meals.map((item, index) => (
            index < SIX_RECOMMENDATIONS ? (
              <Carousel.Item key={ index } data-testid={ `${index}-recomendation-card` }>
                <img
                  className="d-block w-100"
                  alt="Recipe thumbnail"
                  src={ item.strMealThumb }
                  height="120"
                />
                <Carousel.Caption>
                  <h6>
                    { item.strCategory }
                  </h6>
                  <h5 data-testid={ `${index}-recomendation-title` }>
                    { item.strMeal }
                  </h5>
                </Carousel.Caption>
              </Carousel.Item>
            ) : null))
        ) : (
          recommendations[0].drinks && recommendations[0].drinks.map((item, index) => (
            index < SIX_RECOMMENDATIONS ? (
              <Carousel.Item key={ index } data-testid={ `${index}-recomendation-card` }>
                <img
                  alt="Recipe thumbnail"
                  src={ item.strDrinkThumb }
                  height="100"
                />
                <Carousel.Caption>
                  <h6>
                    { item.strCategory }
                  </h6>
                  <h5 data-testid={ `${index}-recomendation-title` }>
                    { item.strDrink }
                  </h5>
                </Carousel.Caption>
              </Carousel.Item>
            ) : null)))}
      </Carousel>
    </section>
  );
}

Recommended.propTypes = {
  recipeType: PropTypes.string,
}.isRequired;

export default Recommended;
