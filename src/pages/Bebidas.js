import React, { useContext } from 'react';
import Cards from '../components/Cards';
import Categorys from '../components/Categorys';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function Bebidas() {
  const {
    createCards,
  } = useContext(MyContext);

  return (
    <div>
      <Header title="Bebidas" explore />
      <Categorys title="Bebidas" />
      {createCards ? <Cards title="Bebidas" /> : null}
      <Footer />
    </div>
  );
}

export default Bebidas;
