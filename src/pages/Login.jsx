import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import {
  setMealsToken,
  setCocktailsToken,
  setUser,
} from '../helpers/setLocalStorage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const checkEmailAndPassword = () => {
    const minimumPasswordSize = 6;
    const re = /.+@[A-z]+[.]com/;
    const isValidEmail = re.test(email);
    const isValidPassword = password.length > minimumPasswordSize;
    if (isValidPassword && isValidEmail) {
      return false;
    }
    return true;
  };

  const emailChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const passwordChange = ({ target: { value } }) => {
    setPassword(value);
  };

  const onClick = () => {
    setMealsToken();
    setCocktailsToken();
    setUser(email);
    const user = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(user));
    setShouldRedirect(true);
  };

  // NOTE:  Esse pattern de redirect só é usado quando se está usando classes
  //        nesse caso deveria usar o useHistory

  return (
    <main>
      <section className="login">
        {shouldRedirect ? (
          <Redirect to="/comidas" />
        ) : (
          <form>
            <div className="form-group">
              <Input
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                type="email"
                placeholder="Email"
                data-testid="email-input"
                onChange={ emailChange }
              />
            </div>
            <div className="form-group">
              <Input
                class="form-control"
                id="exampleInputPassword1"
                name="password"
                type="password"
                placeholder="Senha"
                data-testid="password-input"
                onChange={ passwordChange }
              />
            </div>
            <Button
              className="btn btn-success"
              name="Entrar"
              data-testid="login-submit-btn"
              disabled={ checkEmailAndPassword() }
              onClick={ onClick }
            />
          </form>
        )}
      </section>
    </main>
  );
};

export default Login;
