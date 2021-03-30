import React from 'react';
import PropTypes from 'prop-types';

const YtVideo = (props) => {
  const { currentFood } = props;
  return (currentFood.strYoutube ? <iframe
    frameBorder="0"
    data-testid="video"
    key={ currentFood.strYoutube }
    src={ currentFood.strYoutube.split('watch?v=').join('embed/') }
    title="recipe video"
  />
    : '');
};

YtVideo.propTypes = {
  currentFood: PropTypes.objectOf.isRequired,
};

export default YtVideo;
