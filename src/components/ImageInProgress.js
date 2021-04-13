import React from 'react';
import PropTypes from 'prop-types';

export default function ImageInProgres({ strThumb }) {
  return (
    <img
      src={ strThumb }
      alt="Meal Thumbnail"
      data-testid="recipe-photo"
      className="recipe-photo img-fluid width50"
    />
  );
}

ImageInProgres.propTypes = ({ strThumb: PropTypes.string.isRequired });
