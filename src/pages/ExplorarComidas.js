import React from 'react';
import ExplorerType from '../components/explorer/ExplorerType';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

export default function ExplorarComidas() {
  return (
    <div>
      <Header title="Explorar Comidas" showSearchButton={ false } />
      <ExplorerType type="comidas" />
      <Footer />
    </div>
  );
}
