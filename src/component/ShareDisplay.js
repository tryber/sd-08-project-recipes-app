import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import StyledSharedDisplay from '../styles/component/ShareDisplay';

const LINK_COPIED_TIMEOUT = 2000;

export default function ShareDisplay({ url }) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  return (
    <StyledSharedDisplay>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          navigator.clipboard.writeText(`http://localhost:3000${url}`);
          setIsLinkCopied(true);
          setTimeout(() => setIsLinkCopied(false), LINK_COPIED_TIMEOUT);
        } }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      <span style={ { display: isLinkCopied ? 'block' : 'none' } }>Link copiado!</span>
    </StyledSharedDisplay>
  );
}

ShareDisplay.propTypes = {
  url: PropTypes.string.isRequired,
};
