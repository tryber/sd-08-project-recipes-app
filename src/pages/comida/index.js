import React, { useContext } from 'react';
import Header from '../../components/Header';
import CardFood from '../../components/Card/CardFood';
import SearchBarFood from '../../components/SearchBar/SearchBarFood';
import Footer from '../../components/footer';
import FoodCategoryBar from '../../components/CategoryBar/FoodCategoryBar';
import FoodContext from '../../context/comidaContext/FoodContext';

function Comida() {
  const {
    values: {
      foods,
      filteredMeals,
    },
  } = useContext(FoodContext);
  return (
    <section>
      <Header component={ <SearchBarFood /> }>Comidas</Header>
      <FoodCategoryBar />
      <CardFood foods={ foods } filteredMeals={ filteredMeals } />
      <Footer />
    </section>
  );
}

export default Comida;
