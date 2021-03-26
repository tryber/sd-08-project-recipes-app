import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Perfil() {
  // const emailStorage = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      <Header title="Perfil" searchType="none" />
      <Container fluid>
        <Row>
          <Link to="/receitas-feitas">
            <Button
              variant="secondary"
              style={ { margin: '10px', padding: '0px 100px' } }
            >
              Receitas Feitas
            </Button>
          </Link>
          <Link to="/receitas-favoritas">
            <Button
              variant="secondary"
              style={ { margin: '10px', padding: '0px 100px' } }
            >
              Receitas Favoritas
            </Button>
          </Link>
          <Link to="/">
            <Button
              variant="secondary"
              style={ { margin: '10px', padding: '0px 100px' } }
            >
              Sair
            </Button>
          </Link>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Perfil;
