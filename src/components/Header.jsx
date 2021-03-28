import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProfileButton from './ProfileButton';
import PageTitle from './PageTitle';

import SearchHeader from './SearchHeader';

function Header({ label, Search, page }) {
  const [searchInput, setSearchInput] = useState(false);

  const handleClick = () => {
    setSearchInput(!searchInput);
  };

  return (
    <>
      <header className="header">
        <ProfileButton />
        <PageTitle text={ label } />
        <Search callback={ handleClick } />
      </header>
      {/* ----- WRAPPER ----- */}
      <div className="header-wrap" />
      {/* ------------------- */}
      {searchInput ? <SearchHeader page={ page } /> : ''}
    </>
  );
}

Header.propTypes = {
  label: PropTypes.string.isRequired,
  Search: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
};

export default Header;
