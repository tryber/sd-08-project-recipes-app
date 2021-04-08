import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Button, Form, Container } from 'react-bootstrap';
import { setLocalStorage } from '../../services/localStorage';
import './styles.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const changeStorage = () => {
    const userEmail = { email };
    const IN_PROGRESS_RECIPES = {
      cocktails: {},
      meals: {},
    };

    setLocalStorage('mealsToken', 1);
    setLocalStorage('cocktailsToken', 1);
    setLocalStorage('user', userEmail);
    setLocalStorage('inProgressRecipes', IN_PROGRESS_RECIPES);
    setLocalStorage('doneRecipes', []);
    setRedirect(true);
  };

  const validate = () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minChars = 6;
    if ((email !== '' && emailRegex.test(email)) && (password.length > minChars)) {
      return false;
    }
    return true;
  };

  if (redirect) return <Redirect to="/comidas" />;
  return (
    <Container fluid className="login-form">
      <Form>
        <Form.Group controlId="email-input">
          <Form.Label>
            Email
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite seu Email"
            value={ email }
            data-testid="email-input"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </Form.Group>
        <Form.Group controlId="password-input">
          <Form.Label>
            Senha
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Digite sua senha"
            value={ password }
            data-testid="password-input"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </Form.Group>
        <div className="col text-center">
          <Button
            variant="success"
            data-testid="login-submit-btn"
            onClick={ changeStorage }
            disabled={ validate() }
            size="block"
          >
            Entrar
          </Button>
        </div>
      </Form>
    </Container>
  );
}
