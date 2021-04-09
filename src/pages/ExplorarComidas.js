import React from 'react';
import Explore3Buttons from '../components/Explore3Buttons';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarComidas() {
  return (
    <div>
      <Header title="Explorar Comidas" explore={ false } />
      <Explore3Buttons area name="comidas" />
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
