import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSearch } from '../../store/searchSlice';
import searchIcon from '../../images/searchIcon.svg';

function DefaultSearch() {
  const checked = useSelector((state) => state.search.isSearching);
  const dispatch = useDispatch();
  return (
    <ButtonGroup toggle>
      <ToggleButton
        type="checkbox"
        variant="link"
        checked={ checked }
        value={ 1 }
        onChange={ () => dispatch(toggleSearch()) }
      >
        <img src={ searchIcon } data-testid="search-top-btn" alt="Pesquisar" />
      </ToggleButton>
    </ButtonGroup>
  );
}

export default DefaultSearch;
