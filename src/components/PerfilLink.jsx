import React from 'react';
import { Link } from 'react-router-dom';
// import profileIcon from '../images/profileIcon.svg';
import logoProfile from '../images/Logo_profileIcon.png';

function PerfilLink() {
  return (
    <Link to="/perfil">
      <img
        alt="profile-icon"
        src={ logoProfile }
        data-testid="profile-top-btn"
        className="logo-size profile-logo"
      />
    </Link>
  );
}

export default PerfilLink;
