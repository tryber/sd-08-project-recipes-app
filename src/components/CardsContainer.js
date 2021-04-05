import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/CardsContainer.module.css';

const CardsContainer = ({ children }) => (
  <div className={ styles.cardsContainer }>
    { children }
  </div>
);

CardsContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default CardsContainer;
