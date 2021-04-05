import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';

function CarouselCard(props) {
  const { id, name, img, index } = props;
  return (
    <div
      name={ id }
      className="carousel-card-container"
      data-testid={ `${index}-recomendation-card` }
      hidden={ index > 2 }
    >
      <h4 data-testid={ `${index}-recomendation-title` }>{name}</h4>
      <img src={ img } alt={ name } data-testid={ `${index}-card-img` } />
    </div>
  );
}

CarouselCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CarouselCard;
