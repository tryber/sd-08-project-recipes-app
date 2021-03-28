import React from 'react';
import { useHistory } from 'react-router-dom';

import { profileIcon } from '../constants/Icons';

function ProfileButton() {
  const history = useHistory();
  const handleClick = () => {
    history.push('/perfil');
  };

  return (
    <input
      className="profile-btn"
      type="image"
      src={ profileIcon }
      alt="Imagem do Perfil"
      data-testid="profile-top-btn"
      onClick={ handleClick }
    />
  );
}

export default ProfileButton;
