import React from 'react';
import ExplorerType from '../components/explorer/ExplorerType';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

export default function ExplorarBebidas() {
  return (
    <div>
      <Header title="Explorar Bebidas" showSearchButton={ false } />
      <ExplorerType showAreaButton={ false } type="bebidas" />
      <Footer />
    </div>
  );
}
