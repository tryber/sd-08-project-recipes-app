import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const Card = ({ id, imagePath, title, category, subCategory, index }) => (
  <Link
    to={ `/${category === 'food' ? 'comidas' : 'bebidas'}/${id}` }
    data-testid={ `${index}-recipe-card` }
  >
    <section className="card">
      <img src={ imagePath } alt={ title } data-testid={ `${index}-card-img` } />
      <p className="card-category">{subCategory}</p>
      <p className="card-title" data-testid={ `${index}-card-name` }>
        {title}
      </p>
    </section>
  </Link>
);

Card.defaultProps = {
  subCategory: '',
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string,
  index: PropTypes.number.isRequired,
};

export default Card;
