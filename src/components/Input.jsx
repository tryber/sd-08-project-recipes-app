import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ name, type, ...rest }) => (
  <label htmlFor={ name }>
    <input type={ type } name={ name } { ...rest } />
  </label>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Input;
