import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Header from './Header';
import Footer from './Footer';

function Explorar() {
  const history = useHistory();

  const redirectHandle = (bool) => {
    if (bool) {
      history.push('/explorar/comidas');
    } else {
      history.push('/explorar/bebidas');
    }
  };

  return (
    <>
      <Header title="Explorar" searchType="none" />
      <Container>
        <Row>
          <Col xl="8">
            <Button
              variant="secondary"
              data-testid="explore-food"
              onClick={ () => redirectHandle(true) }
            >
              Explorar Comidas
            </Button>
          </Col>
          <Col xl="8">
            <Button
              variant="secondary"
              data-testid="explore-drinks"
              onClick={ () => redirectHandle(false) }
            >
              Explorar Bebidas
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Explorar;
