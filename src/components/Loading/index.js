import React from 'react';
import { Spinner } from 'react-bootstrap';
import './styles.css';

function Loading() {
  return (
    <div className="loader-div">
      <Spinner
        animation="border"
        variant="success"
        className="m-auto loader"
        style={ { width: '3rem', height: '3rem', borderWidth: '7px' } }
      />
    </div>
  );
}

export default Loading;
