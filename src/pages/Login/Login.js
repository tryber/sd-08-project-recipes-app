import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import login from '../../store/actions/user.actions';
import logo from '../../logo.png';
import './style.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      Email: '',
      senha: '',
      buttonDisabled: true,
    };
    this.logado = this.logado.bind(this);
    this.change = this.change.bind(this);
  }

  change(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.logado);
  }

  logado() {
    const { Email, senha } = this.state;
    const rgx = /\S+@\S+\.\S+/;
    const testeEmail = rgx.test(Email);
    const mininoDigitos = 6;
    if (testeEmail && senha.length > mininoDigitos) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  render() {
    const { history, setEmail } = this.props;
    const { Email, senha, buttonDisabled } = this.state;
    const objUser = { email: Email };
    return (
      <div className="d-flex  flex-column p-2 bd-highlight color">
        <div className="d-flex justify-content-center flex-row-reverse bd-highlight">
          <img src={ logo } className="logo" alt="logo kitchen memories" width="250px" />
        </div>
        <div className="d-flex mb-3 justify-content-center flex-row-reverse bd-highlight">
          <h1>Bem Vindo</h1>
        </div>
        <div className="d-flex flex-column bd-highlight">
          <div className="d-flex p-2 bd-highlight">
            <input
              className="ml-2 mr-3 input-group mb-3 border border-dark login-input"
              type="text"
              name="Email"
              value={ Email }
              placeholder="e-mail"
              data-testid="email-input"
              onChange={ (event) => this.change(event) }
            />
          </div>
          <div className="d-flex p-2 bd-highlight">
            <input
              className="ml-2  mr-3 mb-5 border border-dark login-input"
              type="text"
              name="senha"
              value={ senha }
              placeholder="senha"
              data-testid="password-input"
              onChange={ (event) => this.change(event) }
            />
          </div>

          <Button
            className="btn btn-dark btn-login"
            type="button"
            data-testid="login-submit-btn"
            disabled={ buttonDisabled }
            onClick={ () => {
              localStorage.setItem('mealsToken', 1);
              localStorage.setItem('cocktailsToken', 1);
              localStorage.setItem('user', JSON.stringify(objUser));
              setEmail(objUser.email);
              history.push('/comidas');
            } }
          >
            Entrar
          </Button>

        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(login(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape.isRequired,
  setEmail: PropTypes.func.isRequired,
};
