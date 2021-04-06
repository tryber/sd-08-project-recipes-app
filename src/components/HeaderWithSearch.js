import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import Title from './Title';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function HeaderWithSearch() {
  const history = useHistory();
  const [searchBar, setSearchBar] = useState(false);

  return (
    <header className="header-container">
      <div data-testid="header" className="header">
        <button type="button" onClick={ () => history.push('/perfil') }>
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="profile page"
          />
        </button>
        <h1 data-testid="page-title" className="title"><Title /></h1>
        <button type="button" onClick={ () => setSearchBar(!searchBar) }>
          <img
            src={ searchIcon }
            data-testid="search-top-btn"
            alt="search button"
          />
        </button>
      </div>
      <div>
        {
          searchBar
            ? <SearchBar />
            : ''
        }
      </div>
    </header>
  );
}

export default HeaderWithSearch;
