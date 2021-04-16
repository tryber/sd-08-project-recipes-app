import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Button from '../components/Button';

function Explore() {
  return (
    <div>
      <Header label="Explorar" Search={ () => '' } page="Explorar" />
      <br />
      <br />
      <br />
      <section className="explorar">
        <Link to="/explorar/comidas">
          <Button
            className="btn btn-warning"
            name="Explorar Comidas"
            data-testid="explore-food"
          />
        </Link>
        <Link to="/explorar/bebidas">
          <Button
            className="btn btn-warning"
            name="Explorar Bebidas"
            data-testid="explore-drinks"
          />
        </Link>
      </section>
      <Footer />
    </div>
  );
}

export default Explore;
