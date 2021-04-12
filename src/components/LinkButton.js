import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

function LinkButton({ path, attribute, name, clas }) {
  return (
    <Link to={ path }>
      <button className={ clas } data-testid={ attribute } type="button">{ name }</button>
    </Link>
  );
}

LinkButton.propTypes = {
  path: PropTypes.string.isRequired,
  attribute: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  clas: PropTypes.string.isRequired,
};

export default LinkButton;
