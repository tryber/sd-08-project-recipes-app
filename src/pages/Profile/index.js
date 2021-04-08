import React from 'react';
import { Button, NavbarBrand } from 'react-bootstrap';
import ContainerDefault from '../../components/ContainerDefault';
import { getlocalStorage } from '../../services/localStorage';
import './styles.css';

function Profile() {
  const GetEmail = getlocalStorage('user');
  const email = GetEmail ? GetEmail.email : 'Usuario não logado';
  return (
    <ContainerDefault title="Perfil">
      <h3 className="h6 text-center" data-testid="profile-email">
        { email }
      </h3>
      <NavbarBrand href="/receitas-feitas" className="mx-0">
        <Button
          type="button"
          className="mb-3"
          data-testid="profile-done-btn"
          size="block"
        >
          Receitas Feitas
        </Button>
      </NavbarBrand>
      <NavbarBrand href="/receitas-favoritas" className="mx-0">
        <Button
          type="button"
          className="mb-3"
          data-testid="profile-favorite-btn"
          size="block"
        >
          Receitas Favoritas
        </Button>
      </NavbarBrand>
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
