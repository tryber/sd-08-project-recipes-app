import React from 'react';
import PropTypes from 'prop-types';

export default function Hero({ src, name }) {
  return (
    <img src={ src } alt={ name } data-testid="recipe-photo" />
  );
}

Hero.propTypes = ({
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});
