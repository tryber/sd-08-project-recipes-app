import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../CSS/ProfilePage.css';
import '../CSS/AppMain.css';

function ProfilePage() {
  const history = useHistory();
  const user = localStorage.getItem('user');
  let email = '';
  if (user) email = JSON.parse(user).email;

  const removeLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
  };

  return (
    <section className="profile-page-img main-container">
      <section className="profile-header-section">
        <Header />
        { user
        && <span className="user-title" data-testid="profile-email">{ email }</span> }
      </section>
      <section className="profile-section">
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
          className="regular-button"
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
          className="regular-button"
        >
          Receitas Favoritas
        </button>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ removeLocalStorage }
            className="regular-button"
          >
            Sair
          </button>
        </Link>
      </section>
      <Footer />
    </section>
  );
}

export default ProfilePage;
