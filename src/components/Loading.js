import React from 'react';
import circles from '../images/circles.svg';

export default function Loading() {
  return (
    <div className="loading-container widthM800">
      <img src={ circles } alt="Loading" className="loading mx-auto mb-3" />
      <h1 className="loading-txt font-mountains txt-shdw1 display-3">Loading...</h1>
    </div>
  );
}
