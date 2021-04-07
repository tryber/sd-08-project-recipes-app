import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const validation = () => {
    const reGex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const PASSWORD_LENGTH = 6;
    if (password.length > PASSWORD_LENGTH && reGex.test(email)) {
      return false;
    }
    return true;
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  };

  return (
    <Card className="border-0 w-100 bg-dark cardHeigth">
      <Card.Body className="loginHeader" />
      <Card.Title
        className="m-2 text-center text-warning fw-bold"
      >
        Descubra as melhores receitas do mundo
      </Card.Title>
      <Card.Body className="d-flex flex-column align-items-center w-100">
        <Form.Group className="w-75">
          <Form.Control
            data-testid="email-input"
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu e-mail"
            className="mb-2"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </Form.Group>
        <Form.Group className="w-75">
          <Form.Control
            data-testid="password-input"
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
            className="mb-3"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </Form.Group>
        <Button
          data-testid="login-submit-btn"
          type="button"
          name="login-button"
          id="login-button"
          className="w-75"
          disabled={ validation() }
          onClick={ () => handleClick() }
        >
          Entrar
        </Button>
        <Card.Text
          className="m-2 text-center text-white fw-light"
        >
          Esqueceu a Senha?
        </Card.Text>
      </Card.Body>
    </Card>

  );
}

export default LoginForm;
