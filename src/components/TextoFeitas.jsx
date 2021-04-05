import React from 'react';
import PropTypes from 'prop-types';

function TextoFeitas({ texto, testid }) {
  return (

    <h1
      data-testid={ testid }
    >
      {texto}
    </h1>
  );
}

TextoFeitas.propTypes = {
  texto: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
};

export default TextoFeitas;
