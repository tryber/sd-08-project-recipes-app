import React from 'react';
import PropTypes from 'prop-types';
import './cards.css';

function Card({ data }) {
  const { drink, index } = data;
  const { strDrinkThumb, strDrink } = drink;

  return (
    <section data-testid={ `${index}-recomendation-card` } className="card">
      <img
        data-testid={ `${index}-card-img` }
        src={ strDrinkThumb }
        alt={ strDrink }
      />
      <h3 data-testid={ `${index}-recomendation-title` }>{ strDrink }</h3>
    </section>
  );
}

Card.propTypes = {
  data: PropTypes.shape({
    drink: PropTypes.shape({
      strDrink: PropTypes.string.isRequired,
      strDrinkThumb: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,
};

export default Card;
