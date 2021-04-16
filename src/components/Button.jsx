import React from 'react';
import PropTypes from 'prop-types';
import '../styles/buttons.css';

const Button = ({ name, ...rest }) => (
  <button type="button" { ...rest }>
    {name}
  </button>
);

Button.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Button;
