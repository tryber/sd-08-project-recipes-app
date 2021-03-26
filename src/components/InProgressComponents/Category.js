import React from 'react';
import PropTypes from 'prop-types';

export default function Category({ category }) {
  return (
    <h3 data-testid="recipe-category">{category}</h3>
  );
}

Category.propTypes = ({ category: PropTypes.string.isRequired });
