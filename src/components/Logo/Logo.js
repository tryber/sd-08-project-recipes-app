import React from 'react';
import hatImage from './images/hat.svg';
import doImage from './images/do.svg';
import itImage from './images/it.svg';
import eaImage from './images/ea.svg';
import cookieImage from './images/cookie.svg';
import './logo.css';

const Logo = () => {
  return (
    <div className="logo-container">
      <img className="hat" src={hatImage} alt="" />
      <img className="do" src={doImage} alt="" />
      <img className="it" src={itImage} alt="" />
      <img className="ea" src={eaImage} alt="" />
      <img className="cookie" src={cookieImage} alt="" />
    </div>
  );
};

export default Logo;
