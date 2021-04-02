import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';

// import { Container } from './styles';

function DrinksDetails() {
  const { id } = useParams();
  return (
    <Container>
      <p>
        Detalhes de Bebidas
      </p>
      {console.log(id)}
    </Container>
  );
}

export default DrinksDetails;
