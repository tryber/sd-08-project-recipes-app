import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import './header.css';

const Header = ({ title, visible }) => (
  <div className="container">
    <div className="header">
      <img src={ profileIcon } alt="Profile icon" data-testid="profile-top-btn" />
      <span data-testid="page-title">{title}</span>
      {visible && (
        <img src={ searchIcon } alt="Search icon" data-testid="search-top-btn" />
      )}
    </div>
  </div>
);
Header.defaultProps = {
  visible: true,
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool,
};

export default Header;
