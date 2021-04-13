import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

const ProfilePage = () => {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const storedEmail = JSON.parse(localStorage.getItem('user'));
    if (storedEmail) {
      setEmail(storedEmail.email);
    }
  }, []);

  return (
    <div>
      <Header title="Perfil" showSearchButton={ false } />
      <p data-testid="profile-email">{email}</p>
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
        onClick={ () => { localStorage.clear(); history.push('/'); } }
      >
        Sair
      </button>
      <Footer />
    </div>
  );
};
export default ProfilePage;
