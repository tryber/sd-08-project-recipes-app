import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/IngredientCard.module.css';

const IngredientCard = ({ name, thumbnail, index, ...rest }) => (
  <div
    data-testid={ `${index}-ingredient-card` }
    className={ styles.card }
    { ...rest }
  >
    <img data-testid={ `${index}-card-img` } src={ thumbnail } alt={ name } />
    <p data-testid={ `${index}-card-name` } className={ styles.header }>{ name }</p>
  </div>
);

IngredientCard.propTypes = {
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default IngredientCard;
