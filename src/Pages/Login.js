import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setRedirect } from '../store/loginSlice';
import { Input, Button } from '../Components';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import rockGlass from '../images/rockGlass.svg';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [button, setButton] = useState(true);
  const redirect = useSelector((state) => state.login.redirect);
  const dispatch = useDispatch();

  useEffect(() => {
    const MIN_PASSWORD_LENGTH = 6;
    setButton(!(email.match(/\S+@\S+\.\S+/) && senha.length > MIN_PASSWORD_LENGTH));
  }, [email, senha]);

  const handelClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    dispatch(setRedirect());
  };

  return (
    <>
      {redirect && <Redirect to="/comidas" />}
      <div className="meals">
        <span className="logo">TRYBE!</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
        <Form>
          <Input
            type="text"
            value={ email }
            name="email"
            onChange={ (e) => setEmail(e.target.value) }
            dataId="email-input"
          />
          <Input
            type="password"
            name="senha"
            value={ senha }
            onChange={ (e) => setSenha(e.target.value) }
            dataId="password-input"
          />
          <Button
            onClick={ handelClick }
            dataId="login-submit-btn"
            disabled={ button }
          >
            ENTRAR
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Login;
