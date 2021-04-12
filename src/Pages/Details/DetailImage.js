import React from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

function DetailImage(props) {
  const { src } = props;
  return (
    <section>
      <Image fluid alt="recipe-photo" src={ src } data-testid="recipe-photo" />
    </section>
  );
}

DetailImage.propTypes = {
  src: PropTypes.string,
};

DetailImage.defaultProps = {
  src: '',
};

export default DetailImage;
