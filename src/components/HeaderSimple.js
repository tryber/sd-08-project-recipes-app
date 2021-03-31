import React from 'react';
import { useLocation } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import styles from './HeaderSimple.module.css';

function HeaderSimple() {
  const location = useLocation();
  const title = () => {
    if (location.pathname === '/explorar') {
      return 'Explorar';
    }
    if (location.pathname === '/explorar/comidas') {
      return 'Explorar Comidas';
    }
    if (location.pathname === '/explorar/bebidas') {
      return 'Explorar Bebidas';
    }
    if (location.pathname === '/explorar/comidas/ingredientes') {
      return 'Explorar Ingredientes';
    }
    if (location.pathname === '/explorar/bebidas/ingredientes') {
      return 'Explorar Ingredientes';
    }
    if (location.pathname === '/receitas-feitas') {
      return 'Receitas Feitas';
    }
    if (location.pathname === '/perfil') {
      return 'Perfil';
    }
    if (location.pathname === '/receitas-favoritas') {
      return 'Receitas Favoritas';
    }
  };

  return (
    <div className={ styles.containerHeaderSimple }>
      <div className={ styles.headerSimple }>
        <img
          data-testid="profile-top-btn"
          src={ ProfileIcon }
          alt="user-profile"
        />
        <h2 data-testid="page-title">{title()}</h2>
      </div>
    </div>
  );
}

export default HeaderSimple;
