import React from 'react';
import PropTypes from 'prop-types';

export default function SubmitForm({ handleSubmit, disabled }) {
  return (
    <button
      className="login__btn"
      type="button"
      onClick={ handleSubmit }
      disabled={ disabled }
      data-testid="login-submit-btn"
    >
      Login
    </button>
  );
}

SubmitForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
