/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import Loading from '../components/animation/Loading';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Context } from '../context';
import getApiData from '../services/apiRequest';
import ExplorefoodsButton from '../components/ExplorefoodsButton';

const ExplorerFods = () => {
  const { apiData } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApiData('food', 'random.php').then((data) => {
      apiData.set(data);
      setLoading(false);
      console.log(apiData.value);
    });
  }, []);

  return (

    <div>
      <Header
        name="Explorar Comidas"
        foodClass="explorer-foods"
        Show={ false }
      />
      { loading ? <Loading />
        : <ExplorefoodsButton />}

      <Footer
        foodClass="explorer-foods-footer"
      />
    </div>
  );
};

export default ExplorerFods;
