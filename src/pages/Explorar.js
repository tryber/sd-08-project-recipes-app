import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContextRecipes from '../context/ContextRecipes';
import ComponentExplorar from '../components/ComponentExplorar';

const Explorar = () => {
  const { setHeaderInfo } = useContext(ContextRecipes);

  useEffect(() => {
    setHeaderInfo({ pageTitle: 'Explorar', showSearchIcon: false });
  }, [setHeaderInfo]);

  return (
    <section className="w-100">
      <Header />
      <ComponentExplorar />
      <Footer />
    </section>
  );
};

export default Explorar;
