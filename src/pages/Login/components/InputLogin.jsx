import React from 'react';
import PropTypes from 'prop-types';

export default function InputEmail({ handleChange }) {
  return (
    <label htmlFor="input_Email" className="form__label">
      <input
        className="form__field"
        onChange={ handleChange }
        name="email"
        type="email"
        id="input_Email"
        placeholder="E-mail"
        required
        data-testid="email-input"
      />
    </label>
  );
}

InputEmail.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
