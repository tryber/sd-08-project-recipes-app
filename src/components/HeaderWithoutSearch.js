/* eslint-disable no-lone-blocks */
import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import Title from './Title';

function HeaderWithoutSearch() {
  const history = useHistory();
  return (
    <header>
      <div data-testid="header" className="header">
        <button type="button" onClick={ () => history.push('/perfil') }>
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="profile page"
          />
        </button>
        <h1 data-testid="page-title" className="title"><Title /></h1>
      </div>
    </header>
  );
}

export default HeaderWithoutSearch;
