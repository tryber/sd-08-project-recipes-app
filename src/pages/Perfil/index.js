import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Button, Container } from 'react-bootstrap';
import Footer from '../../components/Footer';
import HeaderLocation from '../../components/Header';
import login from '../../store/actions/user.actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
// import './perfil.css';

class Perfil extends Component {
  constructor() {
    super();
    this.state = {
      routeTo: null,
    };

    this.setRoute = this.setRoute.bind(this);
  }

  setRoute(route) {
    this.setState({ routeTo: route });
  }

  render() {
    const { routeTo } = this.state;
    if (routeTo) return <Redirect push to={ routeTo } />;

    const { email, setEmail } = this.props;
    const userEmailLocalStorage = JSON.parse(localStorage.getItem('user'));

    return (
      <div>
        <Container fluid className="main-profile">
          <HeaderLocation />
          <div className="perfil-container">
            <h6 className="email" data-testid="profile-email">
              {(userEmailLocalStorage && userEmailLocalStorage.email)
              || email || ''}
            </h6>
            <Button
              className="default-button"
              block
              type="button"
              data-testid="profile-done-btn"
              onClick={ () => this.setRoute('/receitas-feitas') }
            >
              Receitas Feitas
            </Button>
            <Button
              className="default-button"
              block
              type="button"
              data-testid="profile-favorite-btn"
              onClick={ () => this.setRoute('/receitas-favoritas') }
            >
              Receitas Favoritas
            </Button>
            <Button
              className="default-button"
              block
              type="button"
              data-testid="profile-logout-btn"
              onClick={ () => {
                localStorage.clear('user');
                setEmail('');
                this.setRoute('/');
              } }
            >
              Sair
            </Button>
          </div>
        </Container>
        <Footer className="footer white" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(login(email)),
});

Perfil.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);
