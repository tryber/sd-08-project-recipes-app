import React from 'react';
// import Footer from '../components/Footer';

import Header from '../components/Header';

function FoodArea() {
  const values = {
    name: 'Receitas Favoritas',
    url: {
      byIngredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
      byName: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      byFirstLetter: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
    },
  };
  return (
    <div>
      <Header params={ values } />
      Favoritas
    </div>
  );
}

export default FoodArea;
