import React from 'react';
import PropTypes from 'prop-types';
import '../styles/card.css';

const CardCarousel = ({ id, imagePath, title, category, index }) => (
  <div
    key={ id }
    className="card"
    data-testid={ `${index}-recomendation-card` }
  >
    <img src={ imagePath } alt={ title } data-testid={ `${index}-card-img` } />
    <p>{category}</p>
    <p data-testid={ `${index}-recomendation-title` }>{title}</p>
  </div>
);

CardCarousel.defaultProps = {
  category: '',
};

CardCarousel.propTypes = {
  id: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string,
  index: PropTypes.number.isRequired,
};

export default CardCarousel;
