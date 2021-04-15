import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/footer';

function Explorar() {
  return (
    <>
      <Header explore="false">Explorar</Header>
      <section className="explore-container">
        <Link to="/explorar/comidas">
          <button type="button" data-testid="explore-food" className="page-buttons">
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas" data-testid="explore-drinks">
          <button type="button" className="page-buttons">
            Explorar Bebidas
          </button>
        </Link>
      </section>
      <Footer />
    </>
  );
}

export default Explorar;
