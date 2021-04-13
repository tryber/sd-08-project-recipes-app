import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

const ProfileIcon = () => {
  const history = useHistory();
  return (
    <img
      role="presentation"
      data-testid="profile-top-btn"
      src={ profileIcon }
      alt="profile-btn"
      onClick={ () => history.push('/perfil') }
    />
  );
};

export default ProfileIcon;
