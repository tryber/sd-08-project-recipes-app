import React from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Explorer from '../components/explorer/Explorer';

const Explore = () => (
  <div>
    <Header title="Explorar" showSearchButton={ false } />
    <Explorer />
    <Footer />
  </div>
);

export default Explore;
