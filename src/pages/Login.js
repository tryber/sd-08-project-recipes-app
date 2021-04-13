import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Button, Form } from 'react-bootstrap';
import login from '../actions/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const { mealsToken, email: user, cocktailsToken } = useSelector((state) => state.login);

  const validation = () => {
    const minPasswordSize = 6;
    const regex = /.+@[A-z]+[.]com/;
    const isValidEmail = regex.test(email);
    const isValidPassword = password.length > minPasswordSize;
    if (isValidPassword && isValidEmail) {
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(email));
  };

  useEffect(() => {
    if (user !== '') {
      localStorage.setItem('mealsToken', mealsToken);
      localStorage.setItem('user', JSON.stringify({ email: user }));
      localStorage.setItem('cocktailsToken', cocktailsToken);
      setRedirect(true);
    }
  }, [user]);

  if (redirect) return <Redirect to="/comidas" />;

  return (
    <section className="login">
      <form className="form" onSubmit={ handleSubmit }>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            data-testid="email-input"
            type="text"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
            placeholder="Email"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Senha:</Form.Label>
          <Form.Control
            data-testid="password-input"
            type="password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
            placeholder="Senha"
          />
        </Form.Group>

        <Button
          block
          className="custom-btn"
          data-testid="login-submit-btn"
          disabled={ validation() }
          type="submit"
          variant="primary"
        >
          Entrar
        </Button>
      </form>
    </section>
  );
}

export default Login;
