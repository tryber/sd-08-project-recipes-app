import React from 'react';
import Footer from '../components/Footer';
import HeaderP from '../components/HeaderP';
import LinkButton from '../components/LinkButton';

import '../styles/Explorar.css';

function Explorar() {
  return (
    <>
      <HeaderP title="Explorar" />
      <main className="explore-main-container">
        <LinkButton
          clas="explore-button"
          path="/explorar/comidas"
          attribute="explore-food"
          name="Explorar Comidas"
        />
        <LinkButton
          clas="explore-button"
          path="/explorar/bebidas"
          attribute="explore-drinks"
          name="Explorar Bebidas"
        />
      </main>
      <Footer />
    </>
  );
}

export default Explorar;
