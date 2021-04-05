import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Container from '../components/Container';

import styles from '../styles/pages/Explore.module.css';

const Explore = () => (
  <Container>
    <div className={ styles.div }>
      <Header title="Explorar" />
      <Link
        className={ styles.buttons }
        to="/explorar/comidas"
        data-testid="explore-food"
      >
        Explorar Comidas
      </Link>
      <Link
        className={ styles.buttons }
        to="/explorar/bebidas"
        data-testid="explore-drinks"
      >
        Explorar Bebidas
      </Link>
      <Footer />
    </div>
  </Container>
);

export default Explore;
