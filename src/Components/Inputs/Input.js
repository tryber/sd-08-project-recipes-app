import React from 'react';
import propTypes from 'prop-types';
import { Form } from 'react-bootstrap';

function Input({ type, name, value, onChange, dataId }) {
  return (
    <Form.Group controlId="emailInput">
      <Form.Label>{ name }</Form.Label>
      <Form.Control
        type={ type }
        data-testid={ dataId }
        onChange={ onChange }
        value={ value }
      />
    </Form.Group>
  );
}

Input.propTypes = {
  type: propTypes.string,
  name: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  dataId: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
