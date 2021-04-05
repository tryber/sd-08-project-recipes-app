import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from '../store/ducks/user';
import * as storage from '../services/storage';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Container from '../components/Container';

import styles from '../styles/pages/Profile.module.css';

const Profile = ({ email, logout }) => {
  const history = useHistory();

  const handleLogout = () => {
    logout();
    storage.clear();
    history.push('/');
  };

  return (
    <Container>
      <Header title="Perfil" />
      <div className={ styles.profile }>
        <p data-testid="profile-email">{ email }</p>
        <Link
          data-testid="profile-done-btn"
          to="/receitas-feitas"
        >
          Receitas Feitas
        </Link>
        <Link
          data-testid="profile-favorite-btn"
          to="/receitas-favoritas"
        >
          Receitas Favoritas
        </Link>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ handleLogout }
        >
          Sair
        </button>
      </div>
      <Footer />
    </Container>
  );
};

Profile.propTypes = {
  email: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => ({
  email: user.email,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
