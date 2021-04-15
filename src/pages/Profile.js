import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.getEmailFromStorage = this.getEmailFromStorage.bind(this);
  }

  getEmailFromStorage() {
    const { email } = JSON.parse(localStorage.getItem('user')) || '';
    return email;
  }

  render() {
    return (
      <div>
        <Header title="Perfil" />
        <p className="hello font-mountains mt-3 mx-3 txt-shdw1 h1">Olá,</p>
        <p
          data-testid="profile-email"
          className="user font-mountains mt-0 mx-5 txt-shdw1 h1"
        >
          { this.getEmailFromStorage() }
          !
        </p>
        <div
          className="
            widthM800
            widthM360
            mx-auto
            mt-3
            btn-group
            btn-group-lg
            btn-group-toggle
            d-flex
            justify-content-center"
        >
          <Link
            to="/receitas-feitas"
          >
            <button
              type="button"
              data-testid="profile-done-btn"
              className="btn-profile btn btn-warning px-2 font-weight-bold"
            >
              Receitas Feitas
            </button>
          </Link>
          <Link
            to="/receitas-favoritas"
          >
            <button
              type="button"
              data-testid="profile-favorite-btn"
              className="btn-profile btn btn-warning px-2 font-weight-bold"
            >
              Receitas Favoritas
            </button>
          </Link>
          <Link
            to="/"
          >
            <button
              type="button"
              data-testid="profile-logout-btn"
              onClick={ () => localStorage.clear() }
              className="btn-profile btn btn-warning px-2 font-weight-bold"
            >
              Sair
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Profile;
