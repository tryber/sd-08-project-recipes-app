import React from 'react';
import ExploreButtons from '../components/ExploreButtons';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explorar() {
  return (
    <div>
      <Header title="Explorar" explore={ false } />
      <ExploreButtons />
      <Footer />
    </div>
  );
}

export default Explorar;
