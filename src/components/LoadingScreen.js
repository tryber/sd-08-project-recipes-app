import React from 'react';
import styles from '../styles/components/LoadingScreen.module.css';

function LoadingScreen() {
  return (
    <div className={ styles.container }>
      <div className={ styles.cLoader } />
    </div>
  );
}

export default LoadingScreen;
