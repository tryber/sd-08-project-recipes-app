import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';

function ProfileButton() {
  const history = useHistory();
  return (
    <button
      onClick={ () => history.push('/perfil') }
      className="main-buttons"
      data-testid="profile-top-btn"
      type="button"
      src="profileIcon"
    >
      <img src={ profileIcon } alt="profile button" />
    </button>
  );
}

export default ProfileButton;
