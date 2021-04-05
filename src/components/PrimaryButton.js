import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/PrimaryButton.module.css';

const PrimaryButton = ({ children, ...rest }) => (
  <button
    className={ styles.primaryButton }
    type="button"
    { ...rest }
  >
    { children }
  </button>
);

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrimaryButton;
