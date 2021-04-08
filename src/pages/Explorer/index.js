import React from 'react';
import { NavbarBrand, Button } from 'react-bootstrap';
import ContainerDefault from '../../components/ContainerDefault';

// import { Container } from './styles';

function Explorer() {
  return (
    <ContainerDefault title="Explorar">
      <NavbarBrand href="/explorar/comidas" className="mx-0">
        <Button
          type="button"
          className="mb-3"
          data-testid="explore-food"
          size="block"
        >
          Explorar Comidas
        </Button>
      </NavbarBrand>
      <NavbarBrand href="/explorar/bebidas" className="mx-0">
        <Button
          type="button"
          className="mb-3"
          data-testid="explore-drinks"
          size="block"
        >
          Explorar Bebidas
        </Button>
      </NavbarBrand>
    </ContainerDefault>
  );
}

export default Explorer;
