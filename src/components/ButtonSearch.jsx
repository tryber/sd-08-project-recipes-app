import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import searchIcon from '../images/searchIcon.svg';
import logoSearch from '../images/Logo_searchIcon.png';
import RecipeSearchBar from './RecipeSearchBar';
import RecipeSearchByArea from './RecipeSearchByArea';

function ButtonSearch({ type }) {
  const [search, setSearchBar] = useState(false);

  const handleClick = () => {
    setSearchBar(!search);
  };

  return (
    <>
      <button
        type="button"
        onClick={ handleClick }
        className="transparent-btn logo-size search-logo"
      >
        <img
          data-testid="search-top-btn"
          src={ logoSearch }
          alt="search-icon"
          className="logo-size search-logo"
        />
      </button>
      { (type !== 'origem' && search) && <RecipeSearchBar /> }
      { (type === 'origem' && !search) && <RecipeSearchByArea /> }
    </>
  );
}

ButtonSearch.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ButtonSearch;
