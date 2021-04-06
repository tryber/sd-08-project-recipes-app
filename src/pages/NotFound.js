import React from 'react';
import './Notfound.css';
import NotfoundIcon from '../images/NotfoundIcon.svg';

const NotFound = () => (
  <div>
    <h1 className="notfound">Not Found</h1>
    <img className="notFoundpic" src={ NotfoundIcon } alt="Logo" />

  </div>
);

export default NotFound;
