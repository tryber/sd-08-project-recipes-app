import React from 'react';
import PropTypes from 'prop-types';
import '../styles/card.css';

const Card = ({ id, imagePath, title, category, index }) => (
  <section key={ id } className="card" data-testid={ `${index}-recipe-card` }>
    <img src={ imagePath } alt={ title } data-testid={ `${index}-card-img` } />
    <p className="card-category">{category}</p>
    <p className="card-title" data-testid={ `${index}-card-name` }>{title}</p>
  </section>
);

Card.defaultProps = {
  category: '',
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string,
  index: PropTypes.number.isRequired,
};

export default Card;
