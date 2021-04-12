import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Perfil() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { email } = user || { email: 'No email found!' };
  return (
    <>
      <Header title="Perfil" searchType="none" />
      <Container fluid>
        <Row>
          <h1 data-testid="profile-email">{ email }</h1>
        </Row>
        <Row>
          <Link to="/receitas-feitas">
            <Button
              variant="secondary"
              style={ { margin: '10px', padding: '0px 100px' } }
              data-testid="profile-done-btn"
            >
              Receitas Feitas
            </Button>
          </Link>
          <Link to="/receitas-favoritas">
            <Button
              variant="secondary"
              style={ { margin: '10px', padding: '0px 100px' } }
              data-testid="profile-favorite-btn"
            >
              Receitas Favoritas
            </Button>
          </Link>
          <Link to="/">
            <Button
              variant="secondary"
              style={ { margin: '10px', padding: '0px 100px' } }
              data-testid="profile-logout-btn"
              onClick={ () => localStorage.clear() }
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
