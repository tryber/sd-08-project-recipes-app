import React, { useState, useContext, useEffect } from 'react';
import ContextReceitas from '../context/ContextReceitas';
import Header from '../components/Header';
import Footer from '../components/Footer';
import buscarAreaListAPI from '../services/buscarAreaList';
import buscarMealsAreaAPI from '../services/buscarMealsAreaAPI';
import CartaoReceitaComidas from '../components/CartaoReceitaComidas';

function ExplorarPorLocalDeOrigem() {
  const { enviarTituloDaPagina, mudarStatusBotaoPesquisa } = useContext(
    ContextReceitas,
  );
  const [areaList, setAreaList] = useState([]);
  const [areaSelected, setAreaSelected] = useState('American');
  const [resultAreaMealsAPI, setResultAreaMealsAPI] = useState([]);

  useEffect(() => {
    enviarTituloDaPagina('Explorar Origem');
    mudarStatusBotaoPesquisa(true);
    async function buscaAPI() {
      const areaListResultAPI = await buscarAreaListAPI();
      setAreaList(areaListResultAPI);
    }
    buscaAPI();
  }, []);

  useEffect(() => {
    async function buscarMealsAPI() {
      const mealsResultAPI = await buscarMealsAreaAPI(areaSelected);
      setResultAreaMealsAPI(mealsResultAPI);
    }
    buscarMealsAPI();
    console.log(resultAreaMealsAPI);
  }, [areaSelected]);

  return (
    <div>
      <Header />
      <form>
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ (e) => setAreaSelected(e.target.value) }
        >
          <option value="all" key="all" data-testid="All-option">
            All
          </option>
          {areaList.map((el) => (
            <option
              key={ el.strArea }
              value={ el.strArea }
              data-testid={ `${el.strArea}-option` }
            >
              {el.strArea}
            </option>
          ))}
        </select>
        <div>
          <CartaoReceitaComidas resultadoApi={ resultAreaMealsAPI } />
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default ExplorarPorLocalDeOrigem;
