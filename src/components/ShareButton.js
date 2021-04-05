import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

import styles from '../styles/components/ShareButton.module.css';

const copy = require('clipboard-copy');

const TWO_SECONDS = 2000;

const ShareButton = ({ testId, link }) => {
  const copiedLink = useRef();

  function handleShowCopiedAlert() {
    copy(link);
    copiedLink.current.style.display = 'block';
    setTimeout(() => {
      copiedLink.current.style.display = 'none';
    }, TWO_SECONDS);
  }

  return (
    <>
      <div className={ styles.copiedLink } ref={ copiedLink }>Link copiado!</div>

      <button
        type="button"
        onClick={ handleShowCopiedAlert }
        className={ styles.shareButton }
      >
        <img
          data-testid={ testId }
          src={ shareIcon }
          alt="Share Icon"
        />
      </button>
    </>
  );
};

ShareButton.propTypes = {
  testId: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default ShareButton;
