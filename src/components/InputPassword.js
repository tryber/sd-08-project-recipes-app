import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const InputPassword = ({
  name, label, updateState, value, fullWidth,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => { event.preventDefault(); };

  return (

    <FormControl fullWidth={ fullWidth }>
      <InputLabel htmlFor={ name }>{label}</InputLabel>
      <Input
        id={ name }
        inputProps={ { 'data-testid': name } }
        type={ showPassword ? 'text' : 'password' }
        value={ value }
        onChange={ (evt) => updateState(evt.target.value) }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={ handleShowPassword }
              onMouseDown={ handleMouseDownPassword }
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

InputPassword.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  updateState: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
};

InputPassword.defaultProps = {
  fullWidth: false,
};

export default InputPassword;
