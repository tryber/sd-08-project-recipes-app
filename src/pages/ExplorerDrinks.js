/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import Loading from '../components/animation/Loading';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Context } from '../context';
import getApiData from '../services/apiRequest';
import ExploreDrinksButton from '../components/ExploreDrinksButton';

const ExplorerDrinks = () => {
  const { apiData } = useContext(Context);
  const [loading, setLoading] = useState('');
  useEffect(() => {
    getApiData('drink', 'random.php').then((data) => {
      apiData.set(data);
      setLoading(false);
    });
  }, []);
  return (

    <div>
      <Header
        name="Explorar Bebidas"
        foodClass="explorer-drinks"
        Show={ false }
      />
      { loading ? <Loading />
        : <ExploreDrinksButton />}
      <Footer
        foodClass="explorer-drinks-footer"
      />
    </div>
  );
};

export default ExplorerDrinks;
