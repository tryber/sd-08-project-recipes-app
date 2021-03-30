import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ label, onChange, name, type, datatestid, value, src, alt, onClick }) => (
  <label htmlFor={ name }>
    { label }
    <input
      type={ type }
      name={ name }
      onChange={ onChange }
      onClick={ onClick }
      data-testid={ datatestid }
      value={ value }
      src={ src }
      alt={ alt }
    />
  </label>
);

Input.propTypes = {
  datatestid: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

Input.defaultProps = {
  label: '',
  value: '',
  name: '',
  onChange: null,
  onClick: null,
  alt: '',
  src: '',
};

export default Input;
