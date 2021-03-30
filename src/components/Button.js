import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ className, label, onClick, datatestid, disabled }) => (
  <button
    type="button"
    onClick={ onClick }
    data-testid={ datatestid }
    disabled={ disabled }
    className={ className }
  >
    { label }
  </button>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  datatestid: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
  className: '',
};

export default Button;
