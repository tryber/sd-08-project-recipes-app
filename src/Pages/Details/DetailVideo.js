import React from 'react';
import PropTypes from 'prop-types';

function DetailVideo(props) {
  const { vidSrc } = props;
  return (
    <section>
      <h1>Vídeo</h1>
      <iframe
        src={ vidSrc.replace('watch', 'embed') }
        data-testid="video"
        title="Vídeo"
      />
    </section>
  );
}

DetailVideo.propTypes = {
  vidSrc: PropTypes.string,
};

DetailVideo.defaultProps = {
  vidSrc: '',
};

export default DetailVideo;
