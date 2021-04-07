import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';

function ComponentPerfil() {
  const { setHeaderInfo, setUserEmail, userEmail,
  } = useContext(ContextRecipes);

  const history = useHistory();

  useEffect(() => {
    setHeaderInfo({
      pageTitle: 'Perfil',
      showSearchIcon: false,
    });
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      setUserEmail(JSON.parse(localStorage.getItem('user')).email);
    } else {
      setUserEmail('name@email.com');
    }
  }, [setHeaderInfo, setUserEmail]);

  return (
    <section className="w-100 bg-dark cardHeigth cardBody">
      <h1
        data-testid="profile-email"
        className="p-5 text-white"
      >
        { userEmail }
      </h1>
      <Button
        className="btn btn-primary"
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Receitas Feitas
      </Button>
      <Button
        className="btn btn-primary"
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/receitas-favoritas') }
      >
        Receitas Favoritas
      </Button>
      <Button
        className="btn btn-primary"
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          history.push('/');
          localStorage.clear();
        } }
      >
        Sair
      </Button>
    </section>
  );
}

export default ComponentPerfil;
