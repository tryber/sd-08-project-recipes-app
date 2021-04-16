import React from 'react';
import PropTypes from 'prop-types';

const VideoRecipeDetails = ({ videoPath }) => (
  <section className="video-recipe-details">
    <h3>Vídeo</h3>
    <div className="embed-responsive embed-responsive-16by9">
      <iframe
        className="embed-responsive-item"
        data-testid="video"
        width="320"
        height="240"
        src={ videoPath.replace('watch?v=', 'embed/') }
        title="recipe video"
      />
    </div>
  </section>
);

VideoRecipeDetails.propTypes = {
  videoPath: PropTypes.string.isRequired,
};

export default VideoRecipeDetails;
