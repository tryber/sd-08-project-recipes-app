import React from 'react';
import Explore3Buttons from '../components/Explore3Buttons';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarBebidas() {
  return (
    <div>
      <Header title="Explorar Bebidas" />
      <Explore3Buttons area={ false } name="bebidas" />
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
