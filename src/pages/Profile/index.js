import React from 'react';
import { Button, NavbarBrand } from 'react-bootstrap';
import { useHistory } from 'react-router';
import ContainerDefault from '../../components/ContainerDefault';
import { getlocalStorage } from '../../services/localStorage';
import './styles.css';

function Profile() {
  const GetEmail = getlocalStorage('user');
  const email = GetEmail ? GetEmail.email : 'Usuario não logado';
  const history = useHistory();
  return (
    <ContainerDefault title="Perfil">
      <h3 className="h6 text-center" data-testid="profile-email">
        { email }
      </h3>
      <Button
        type="button"
        className="mb-3"
        data-testid="profile-done-btn"
        size="block"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Receitas Feitas
      </Button>
      <Button
        type="button"
        className="mb-3"
        data-testid="profile-favorite-btn"
        size="block"
        onClick={ () => history.push('/receitas-favoritas') }
      >
        Receitas Favoritas
      </Button>
      <NavbarBrand href="/" className="mx-0">
        <Button
          type="button"
          className="mb-3"
          variant="danger"
          data-testid="profile-logout-btn"
          size="block"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </Button>
      </NavbarBrand>
    </ContainerDefault>
  );
}

export default Profile;
