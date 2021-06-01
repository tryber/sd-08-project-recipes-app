import React from 'react';
import Footer from '../components/Footer';

import Header from '../components/Header';

function FoodArea() {
  const values = {
    name: 'Explorar Origem',
    url: {
      byIngredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
      byName: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      byFirstLetter: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
    },
  };
  return (
    <div>
      <Header params={ values } />
      Local Origem
      <Footer />
    </div>
  );
}

export default FoodArea;
