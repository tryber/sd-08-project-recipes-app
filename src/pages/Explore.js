import { Button } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Explore.css';

function Explore() {
  return (
    <>
      <Header />
      <section className="explore-button">
        <Link
          data-testid="explore-food"
          to="/explorar/comidas"
        >
          <Button
            className="custom-btn-explore"
            block
            variant="primary"
          >
            Explorar Comidas
          </Button>
        </Link>
        <Link
          data-testid="explore-drinks"
          to="/explorar/bebidas"
        >
          <Button
            className="custom-btn-explore"
            block
            variant="primary"
          >
            Explorar Bebidas
          </Button>
        </Link>
      </section>
      <Footer />
    </>
  );
}

export default Explore;
