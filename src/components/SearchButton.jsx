import React from 'react';
import PropTypes from 'prop-types';

import { searchIconWhite } from '../common/svgStore';

function SearchButton({ callback }) {
  return (
    <input
      type="image"
      src={ searchIconWhite }
      alt="Imagem da Busca"
      data-testid="search-top-btn"
      onClick={ callback }
    />
  );
}

SearchButton.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default SearchButton;
