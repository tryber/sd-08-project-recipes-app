import React from 'react';
import PropTypes from 'prop-types';

export default function InputPassword({ handleChange }) {
  return (
    <label htmlFor="input_Password" className="form__label">
      <input
        className="form__field"
        onChange={ handleChange }
        name="password"
        type="password"
        id="input_Password"
        placeholder="Senha"
        required
        data-testid="password-input"
      />
    </label>
  );
}

InputPassword.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
