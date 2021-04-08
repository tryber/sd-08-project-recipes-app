import React from 'react';
import { Spinner } from 'react-bootstrap';

// import { Container } from './styles';

function Loading() {
  return (
    <Spinner animation="border" variant="primary" className="mx-auto" />
  );
}

export default Loading;
