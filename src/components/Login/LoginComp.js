import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import LoginContext from '../../contextApi/createContext';

function LoginComponent() {
  const { setEmail,
    email,
    setPassword,
    password, saveToLocalStorage } = useContext(LoginContext);

  const [disableds, setDisabled] = useState(true);

  useEffect(() => {
    const validations = () => {
      const PASSWRDLENGTH = 6;
      const re = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
      if (password && password.length
         > PASSWRDLENGTH && email && re.test(email) === true) {
        setDisabled(false);
      }
    };
    validations();
  }, [email, password]);

  const submit = () => {
    saveToLocalStorage();
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
  };
  console.log(email);
  return (
    <div>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          data-testid="email-input"
          name="email"
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          data-testid="password-input"
          name="password"
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>
      <Button
        variant="success"
        data-testid="login-submit-btn"
        onClick={ submit }
        disabled={ disableds }

      >
        Entrar
      </Button>
    </div>
  );
}

export default LoginComponent;
