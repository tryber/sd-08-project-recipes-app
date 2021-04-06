import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import searchicon from '../images/searchIcon.svg';
import { Context } from '../context';

const SearchButton = () => {
  const { hideSearchBar: { value, set } } = useContext(Context);

  return (
    <Button
      src={ searchicon }
      onClick={ () => set(!value) }
      type="button"
      data-testid="search-top-btn"
    >
      <img src={ searchicon } alt="searchIcon" />
    </Button>
  );
};

export default SearchButton;
