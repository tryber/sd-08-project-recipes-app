import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const InputRadio = ({ name, label, value, classes, color }) => (
  <FormControlLabel
    value={ value }
    label={ label }
    control={
      <Radio
        color={ color }
        inputProps={ { 'data-testid': name } }
        className={ classes }
      />
    }
  />
);

InputRadio.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  classes: PropTypes.string,
  color: PropTypes.string,
};

InputRadio.defaultProps = {
  classes: '',
  color: 'secondary',
};

export default InputRadio;
