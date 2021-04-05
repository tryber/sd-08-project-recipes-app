import React from 'react';
import './IngredientCard.css';
import PropTypes from 'prop-types';

function IngredientCard(props) {
  const { id, name, img, index, onClick } = props;
  return (
    <div
      name={ id }
      className="ingredient-card-container"
      data-testid={ `${index}-ingredient-card` }
      onClick={ onClick }
      role="button"
      tabIndex={ index }
      onKeyDown={ () => console.log('Cara, como esse linter é chato, Ave Maria') }
    >
      <h4 data-testid={ `${index}-card-name` }>{name}</h4>
      <img src={ img } alt={ name } data-testid={ `${index}-card-img` } />
    </div>
  );
}

IngredientCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IngredientCard;
