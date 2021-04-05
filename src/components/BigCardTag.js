import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/BigCardTag.module.css';

const BigCardTag = ({ tag, ...rest }) => (
  <p className={ styles.bigCardTag } { ...rest }>{ tag }</p>
);

BigCardTag.propTypes = {
  tag: PropTypes.string.isRequired,
};

export default BigCardTag;
