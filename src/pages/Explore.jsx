import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Layout from '../components/Layout';

function Explore() {
  return (
    <Layout
      label="Explorar"
      Search={ () => '' }
      page="Explorar"
    >
      <section className="content">
        <section className="explore">
          <Link to="/explorar/comidas">
            <Button name="Explorar Comidas" data-testid="explore-food" />
          </Link>
          <Link to="/explorar/bebidas">
            <Button name="Explorar Bebidas" data-testid="explore-drinks" />
          </Link>
        </section>
      </section>
    </Layout>
  );
}

export default Explore;
