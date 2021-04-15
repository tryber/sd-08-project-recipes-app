import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderLocation from '../components/Header';

class Explorar extends Component {
  render() {
    return (
      <div>
        <Container fluid>
          <HeaderLocation title="Explorar" />
          <div>
            <Link
              data-testid="explore-food"
              to="/explorar/comidas"
            >
              <Button
                className="default-button orange"
                block
                type="button"
              >
                Explorar Comidas
              </Button>
            </Link>
            <Link
              data-testid="explore-drinks"
              to="/explorar/bebidas"
            >
              <Button
                className="default-button orange"
                block
                type="button"
              >
                Explorar Bebidas
              </Button>
            </Link>
          </div>
        </Container>
        <Footer className="footer white" />
      </div>
    );
  }
}

export default Explorar;
