import React from 'react';
import PropTypes from 'prop-types';

export default function Title({ name }) {
  return (
    <h2 data-testid="recipe-title">{name}</h2>
  );
}

Title.propTypes = ({ name: PropTypes.string.isRequired });
