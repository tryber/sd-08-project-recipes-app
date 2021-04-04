import React from 'react';
import { Header, Footer, ExploreCard } from '../../component';

export default function Explore() {
  return (
    <>
      <Header pageTitle="Explorar" showSearchButton={ false } />
      <ExploreCard cardName="Explorar Comidas" cardId="food" linkTo="/explorar/comidas" />
      <ExploreCard
        cardName="Explorar Bebidas"
        cardId="drinks"
        linkTo="/explorar/bebidas"
      />
      <Footer />
    </>
  );
}
