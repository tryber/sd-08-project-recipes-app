import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function NotFound() {
  const BOOLEAN_TRUE = true;
  return (
    <div>
      <Header title="Explorar Origem" disableBtn={ BOOLEAN_TRUE } />
      Not Found
      <Footer />
    </div>
  );
}

export default NotFound;
