import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';

function Profile() {
  const [userEmail, setUserEmail] = useState({});
  const history = useHistory();

  useEffect(() => {
    setUserEmail(JSON.parse(localStorage.getItem('user') || '{}'));
  }, []);

  return (
    <>
      <Header />
      <h4 className="email" data-testid="profile-email">{userEmail.email}</h4>
      <section className="profile-container">
        <Button
          block
          className="custom-btn-profile"
          data-testid="profile-done-btn"
          onClick={ () => { history.push('/receitas-feitas'); } }
          to="/receitas-feitas"
          type="button"
        >
          Receitas Feitas
        </Button>
        <Button
          block
          className="custom-btn-profile"
          data-testid="profile-favorite-btn"
          onClick={ () => { history.push('/receitas-favoritas'); } }
          type="button"
        >
          Receitas Favoritas
        </Button>
        <Button
          block
          className="custom-btn-profile"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
          type="button"
        >
          Sair
        </Button>
      </section>
      <Footer />
    </>
  );
}

export default Profile;
