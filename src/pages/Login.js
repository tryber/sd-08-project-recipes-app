import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const checkValidity = () => {
    const PASSWORD_LENGTH = 6;
    const { email, password } = login;
    if (/\S+@\S+\.\S+/i.test(email) && password.length > PASSWORD_LENGTH) {
      return false;
    }
    return true;
  };

  const handleChange = ({ target }) => {
    setLogin({ ...login, [target.name]: target.value });
  };

  const saveLocalStorage = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const emailObj = {
      email: login.email,
    };
    localStorage.setItem('user', JSON.stringify(emailObj));
  };

  const history = useHistory();

  const handleSubmit = () => {
    saveLocalStorage();
    history.push('/comidas');
  };

  // useEffect(() => {
  //   const getFavsFromLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   if (!getFavsFromLocal) {
  //     localStorage.setItem('favoriteRecipes',
  //       JSON.stringify([{ id: 0,
  //         type: '',
  //         area: '',
  //         category: '',
  //         alcoholicOrNot: '',
  //         name: '',
  //         image: '',
  //         doneDate: '',
  //         tags: [] }]));
  //   }

  //   const recipesProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   if (!recipesProgress) {
  //     localStorage.setItem(
  //       'inProgressRecipes',
  //       JSON.stringify({
  //         cocktails: {
  //         },
  //         meals: {
  //         },
  //       }),
  //     );
  //   }
  // });

  return (
    <form>
      <label htmlFor="email">
        e-mail
        <input
          type="email"
          id="email"
          name="email"
          data-testid="email-input"
          value={ login.email }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="password">
        password
        <input
          type="password"
          id="password"
          name="password"
          data-testid="password-input"
          value={ login.password }
          onChange={ handleChange }
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ checkValidity() }
        onClick={ () => handleSubmit() }
      >
        Entrar
      </button>
    </form>

  );
}
