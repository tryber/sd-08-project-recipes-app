import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

function FooterButton({ alt, path, ...rest }) {
  const history = useHistory();
  const handleClick = () => {
    history.push(path);
  };
  return (
    <input
      type="image"
      alt={ alt }
      { ...rest }
      onClick={ handleClick }
    />
  );
}

FooterButton.propTypes = {
  alt: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default FooterButton;
