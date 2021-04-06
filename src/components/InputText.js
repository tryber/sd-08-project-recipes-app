import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const InputText = ({
  name, label, updateState, value, variant, size, fullWidth, type,
}) => (
  <TextField
    fullWidth={ fullWidth }
    variant={ variant }
    size={ size }
    id={ name }
    label={ label }
    type={ type }
    value={ value }
    onChange={ (evt) => updateState(evt.target.value) }
    inputProps={ { 'data-testid': name } }
    required
  />
);

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  updateState: PropTypes.func.isRequired,
  variant: PropTypes.string,
  size: PropTypes.string,
  fullWidth: PropTypes.bool,
  type: PropTypes.string,
};

InputText.defaultProps = {
  variant: 'standard',
  size: 'medium',
  fullWidth: false,
  type: 'text',
};

export default InputText;
