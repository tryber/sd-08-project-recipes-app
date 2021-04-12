import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import ContainerDefault from '../../components/ContainerDefault';

// import { Container } from './styles';

function Explorer() {
  const history = useHistory();

  return (
    <ContainerDefault title="Explorar">
      <Button
        type="button"
        className="mb-3"
        data-testid="explore-food"
        size="block"
        onClick={ () => history.push('/explorar/comidas') }
      >
        Explorar Comidas
      </Button>
      <Button
        type="button"
        className="mb-3"
        data-testid="explore-drinks"
        size="block"
        onClick={ () => history.push('/explorar/bebidas') }
      >
        Explorar Bebidas
      </Button>
    </ContainerDefault>
  );
}

export default Explorer;
