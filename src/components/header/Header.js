import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
// import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../searchBar/SeachBar';
import '../../styles/main.css';

const Header = ({ title, showSearchButton = true }) => {
  const [showInput, setHidden] = useState(false);
  const history = useHistory();

  const redirectPages = (path) => {
    history.push(path);
  };

  return (
    <>
      <div className="header">

        <button
          className="profileIcon imgIcons"
          type="button"
          onClick={ () => redirectPages('./perfil') }
        >
          <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcon" />
        </button>

        <h2 data-testid="page-title">{title}</h2>
      </div>
      {showSearchButton && (
        <div className="margin-div-space">
          {/* <button
            className="searchBtnInput"
            type="button"
            onClick={ () => setHidden(!showInput) }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search icon"
            />
          </button> */}
          <SearchBar setHidden={ setHidden } showInput={ showInput } typeAPI={ title } />

        </div>
      )}

    </>

  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearchButton: PropTypes.bool.isRequired,
};

export default Header;
