import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/RecipeVideo.module.css';

const RecipeVideo = ({ src }) => (
  <div className={ styles.videoContainer }>
    <h2>Vídeo</h2>
    <iframe
      data-testid="video"
      title="qualquer coisa"
      width="560"
      height="315"
      src={ src }
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
    />
  </div>
);

RecipeVideo.propTypes = {
  src: PropTypes.string.isRequired,
};

export default RecipeVideo;
