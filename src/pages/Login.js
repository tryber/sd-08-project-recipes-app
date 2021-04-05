import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import login from '../store/actions/user.actions';

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
      <div className="login">
        <main className="main">
          <div className="form">
            <input
              className="input-text"
              type="text"
              name="Email"
              value={ Email }
              placeholder="e-mail"
              data-testid="email-input"
              onChange={ (event) => this.change(event) }
            />
            <input
              className="input-text"
              type="text"
              name="senha"
              value={ senha }
              placeholder="senha"
              data-testid="password-input"
              onChange={ (event) => this.change(event) }
            />
            <button
              className="btn-login"
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
            </button>
          </div>
        </main>
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
