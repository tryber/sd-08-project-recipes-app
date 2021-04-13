import React from 'react';
import { useLocation } from 'react-router';
import ExploreIngredients from '../components/explorer/ExploreIngredients';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

export default function Ingredientes() {
  const location = useLocation();
  const isFood = location.pathname.includes('comidas');

  return (
    <div>
      <Header title="Explorar Ingredientes" showSearchButton={ false } />
      <ExploreIngredients type={ isFood ? 'comidas' : 'bebidas' } />
      <Footer />
    </div>
  );
}
