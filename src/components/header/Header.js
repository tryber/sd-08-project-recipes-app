import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../searchBar/SeachBar';

const Header = ({ title, showSearchButton = true }) => {
  const [showInput, setHidden] = useState(false);
  const history = useHistory();

  const redirectPages = (path) => {
    history.push(path);
  };

  return (

    <div>

      <button
        type="button"
        onClick={ () => redirectPages('./perfil') }
      >
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcon" />
      </button>

      <h2 data-testid="page-title">{title}</h2>
      {showSearchButton && (
        <>
          <SearchBar showInput={ showInput } typeAPI={ title } />
          <button
            type="button"
            onClick={ () => setHidden(!showInput) }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search icon"
            />
          </button>
        </>
      )}

    </div>

  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearchButton: PropTypes.bool.isRequired,
};

export default Header;
