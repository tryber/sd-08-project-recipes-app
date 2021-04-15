import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// import Button from '../components/Button';
import Input from '../components/Inputs';
import Arrow from '../images/arrow.svg';
import Logo from '../images/logo2.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const userEmail = { email };

  useEffect(() => {
    function buttonAble() {
      const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      const minOfCaracteres = 6;
      if (validEmail.test(email) && password.length > minOfCaracteres) {
        setDisabled(false);
      }
    }
    buttonAble();
  }, [email, password]);

  const history = useHistory();

  return (
    <div className="login-background">
      <div className="logo-container">
        <img src={ Logo } alt="logo" width="200px" />
        <fieldset className="login-container">
          <Input
            type="text"
            datatestid="email-input"
            label="EMAIL : "
            name={ email }
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
          <Input
            type="password"
            label="SENHA : "
            name={ password }
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            datatestid="password-input"
          />
          <input
            type="image"
            src={ Arrow }
            alt="arrow"
            className="enter-btn"
            disabled={ disabled }
            data-testid="login-submit-btn"
            onClick={ () => {
              localStorage.setItem('mealsToken', 1);
              localStorage.setItem('cocktailsToken', 1);
              localStorage.setItem('user', JSON.stringify(userEmail));
              history.push('/comidas');
            } }
          />
          {/* <Button
            label="Entrar"
            datatestid="login-submit-btn"
            disabled={ disabled }
            onClick={ () => {
              localStorage.setItem('mealsToken', 1);
              localStorage.setItem('cocktailsToken', 1);
              localStorage.setItem('user', JSON.stringify(userEmail));
              history.push('/comidas');
            } }
          /> */}
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
