import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from './ContextRecipes';
import {
  getComidasByName,
  getComidasByIngredientes,
  getComidasByPrimeiraLetra,
  getBebidasByName,
  getBebidasByingredientes,
  getBebidasByPrimeiraLetra } from '../services/BuscaNasAPIs';

function ProviderRecipes({ children }) {
  const headerInfoInitial = {
    pageTitle: '',
    showSearchIcon: true,
  };

  const barraBuscarInitial = {
    input: '',
    radio: '',
  };

  const [headerInfo, setHeaderInfo] = useState(headerInfoInitial);
  const [barraBuscar, setBarraBuscar] = useState(barraBuscarInitial);
  const [dataByBusca, setDataByBuscar] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  const fetchDataComidas = useCallback(async () => {
    const { input, radio } = barraBuscar;
    if (radio === 'nome') {
      const { meals } = await getComidasByName(input);
      return setDataByBuscar({ meals });
    }
    if (radio === 'ingredientes') {
      const { meals } = await getComidasByIngredientes(input);
      return setDataByBuscar({ meals });
    }
    if (radio === 'primeira letra') {
      if (barraBuscar.input.length === 1) {
        const { meals } = await getComidasByPrimeiraLetra(input);
        return setDataByBuscar({ meals });
      }
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    setIsFetching(false);
  }, [barraBuscar]);

  const fetchDataBebidas = useCallback(async () => {
    const { input, radio } = barraBuscar;
    if (radio === 'nome') {
      const { drinks } = await getBebidasByName(input);
      return setDataByBuscar({ drinks });
    }
    if (radio === 'ingredientes') {
      const { drinks } = await getBebidasByingredientes(input);
      return setDataByBuscar({ drinks });
    }
    if (radio === 'primeira letra') {
      if (barraBuscar.input.length === 1) {
        const { drinks } = await getBebidasByPrimeiraLetra(input);
        return setDataByBuscar({ drinks });
      }
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    setIsFetching(false);
  }, [barraBuscar]);

  useEffect(() => {
    if (barraBuscar.radio !== '' && headerInfo.pageTitle === 'Comidas') {
      fetchDataComidas();
    }
    if (barraBuscar.radio !== '' && headerInfo.pageTitle === 'Bebidas') {
      fetchDataBebidas();
    }
  }, [barraBuscar, headerInfo.pageTitle, fetchDataComidas, fetchDataBebidas]);

  return (
    <ContextRecipes.Provider
      value={
        {
          headerInfo,
          setHeaderInfo,
          barraBuscar,
          setBarraBuscar,
          dataByBusca,
          isFetching,
          setIsFetching,
          favoriteRecipes,
          setFavoriteRecipes,
          userEmail,
          setUserEmail }
      }
    >
      {children}
    </ContextRecipes.Provider>
  );
}

ProviderRecipes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderRecipes;
