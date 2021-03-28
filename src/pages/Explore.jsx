import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Button from '../components/Button';

function Explore() {
  return (
    <>
      <Header label="Explorar" Search={ () => '' } page="Explorar" />
      <section className="explore-main">
        <Link to="/explorar/comidas">
          <Button name="Explorar Comidas" data-testid="explore-food" />
        </Link>
        <Link to="/explorar/bebidas">
          <Button name="Explorar Bebidas" data-testid="explore-drinks" />
        </Link>
      </section>
      <Footer />
    </>
  );
}

export default Explore;
