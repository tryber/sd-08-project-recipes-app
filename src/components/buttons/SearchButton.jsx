import React from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../images/searchIcon.svg';

function SearchButton({ handleDrop, status }) {
  const handleClick = () => {
    handleDrop(!status);
  };

  return (
    <button
      src="searchIcon"
      className="main-buttons"
      data-testid="search-top-btn"
      type="button"
      onClick={ handleClick }
    >
      <img src={ searchIcon } alt="search button" />
    </button>
  );
}

SearchButton.propTypes = {
  handleDrop: PropTypes.func.isRequired,
  status: PropTypes.bool.isRequired,
};

export default SearchButton;
