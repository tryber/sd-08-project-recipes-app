import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

import '../styles/HeaderP.css';

const HeaderP = ({ title }) => (
  <div className="navbar headerP">
    <Link to="/perfil">
      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="profile"
      />
    </Link>
    <h1 data-testid="page-title">{ title }</h1>
    <span />
  </div>
);

HeaderP.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderP;
