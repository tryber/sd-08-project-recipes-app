import React from 'react';

import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

export default function Header() {
  return (
    <header>
      <button type="button" data-testid="search-top-btn">
        <img src={ SearchIcon } alt="search-icon" />
      </button>
      <h1 data-testid="page-title">Comidas</h1>
      <button type="button" data-testid="profile-top-btn">
        <img src={ ProfileIcon } alt="profile-icon" />
      </button>
    </header>
  );
}
