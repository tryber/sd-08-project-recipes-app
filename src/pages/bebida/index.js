import React from 'react';
import Header from '../../components/Header';
import CardDrink from '../../components/Card/CardDrink';
import SearchBarDrink from '../../components/SearchBar/SearchBarDrink';
import Footer from '../../components/footer';
import DrinkCategoryBar from '../../components/CategoryBar/DrinkCategoryBar';

function Bebida() {
  return (
    <section>
      <Header component={ <SearchBarDrink /> }>Bebidas</Header>
      <DrinkCategoryBar />
      <CardDrink />
      <Footer />
    </section>
  );
}

export default Bebida;
