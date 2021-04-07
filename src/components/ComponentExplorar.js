import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const ComponentExplorar = () => {
  const history = useHistory();

  return (
    <section className="w-100 bg-dark cardHeigth cardBody">
      <Button
        className="btn btn-primary mt-5"
        type="button"
        data-testid="explore-food"
        onClick={ () => history.push('/explorar/comidas') }
      >
        Explorar Comidas
      </Button>
      <Button
        className="btn btn-primary"
        type="button"
        data-testid="explore-drinks"
        onClick={ () => history.push('/explorar/bebidas') }
      >
        Explorar Bebidas
      </Button>
    </section>
  );
};

export default ComponentExplorar;
