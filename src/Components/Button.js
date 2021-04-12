import React from 'react';
import propTypes from 'prop-types';

function Button({ children, onClick, dataId, disabled }) {
  return (
    <button
      type="button"
      onClick={ onClick }
      data-testid={ dataId }
      disabled={ disabled }
    >
      { children }
    </button>
  );
}

Button.propTypes = {
  children: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
  dataId: propTypes.string.isRequired,
  disabled: propTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
