import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ProfilePage() {
  const history = useHistory();

  const getUser = () => {
    const data = JSON.parse(localStorage.getItem('user'));
    return data.email || ' ';
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="div-foods">
      <Header label="Perfil" Search={ () => '' } />
      <section className="profile-main">
        <div data-testid="profile-email">
          {getUser()}
        </div>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas

        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas

        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Sair

        </button>
      </section>
      <Footer />
    </div>
  );
}

export default ProfilePage;
