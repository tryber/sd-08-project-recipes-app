import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderP from '../components/HeaderP';
import '../styles/Perfil.css';

import Context from '../context/Context';

function Perfil() {
  // Auxílio Arnaelcio: https://github.com/arnaelcio
  const mockEmail = useContext(Context);

  const { email, setEmail } = mockEmail;

  const clearLocalStorage = () => {
    if (localStorage.length > 0) {
      localStorage.clear();
      setEmail('');
    }
  };

  useEffect(() => {
    if (localStorage.length === 0) {
      setEmail('email@email.com');
    } if (localStorage.length !== 0) {
      setEmail(JSON.parse(localStorage.user).email);
    }
  });
  // -----------------------------------------------

  return (
    <div>
      <HeaderP title="Perfil" />
      <div className="container-perfil">
        <div><h4 data-testid="profile-email">{ email }</h4></div>
        <div className="div-btn-perfil">
          <NavLink to="/receitas-feitas">
            <button
              type="button"
              data-testid="profile-done-btn"
              className="btn-profile"
            >
              Receitas Feitas
            </button>
          </NavLink>
        </div>
        <div className="div-btn-perfil">
          <NavLink to="/receitas-favoritas">
            <button
              type="button"
              data-testid="profile-favorite-btn"
              className="btn-profile"
            >
              Receitas Favoritas
            </button>
          </NavLink>
        </div>
        <div className="div-btn-perfil">
          <NavLink to="/">
            <button
              type="button"
              data-testid="profile-logout-btn"
              className="btn-profile"
              onClick={ () => clearLocalStorage() }
            >
              Sair
            </button>
          </NavLink>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Perfil;
