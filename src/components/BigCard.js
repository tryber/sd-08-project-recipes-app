import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/BigCard.module.css';

const BigCard = ({ image, info }) => (
  <div className={ styles.bigCardContainer }>
    <div className={ styles.bigCardImageContainer }>
      { image }
    </div>
    <div className={ styles.bigCardInfo }>
      { info }
    </div>
  </div>
);

BigCard.propTypes = {
  image: PropTypes.node.isRequired,
  info: PropTypes.node.isRequired,
};

export default BigCard;
