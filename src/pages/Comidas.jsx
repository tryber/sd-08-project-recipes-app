import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { buscarComidasPorCategoria } from '../services/buscarCategoriasComidas';
import CartaoReceitaComidas from '../components/CartaoReceitaComidas';
import ContextReceitas from '../context/ContextReceitas';
import { fetchComidasAPI } from '../services/fetchComidas';

function Comidas() {
  const {
    comidas,
    setComidas,
    apiResult,
    tituloDaPagina,
    enviarTituloDaPagina,
    mudarStatusBotaoPesquisa,
    categoriasComidas,
    listaDeCategoria,
    setlistaDeCategoria,
    toggle,
    setToggle,
  } = useContext(ContextReceitas);

  const [clickInfo, setClickInfo] = useState('Primeira Vez');

  useEffect(() => {
    async function listaComidasAPI() {
      const ComidasAPI = await fetchComidasAPI();
      setComidas(ComidasAPI);
    }
    listaComidasAPI();
    enviarTituloDaPagina('Comidas');
    mudarStatusBotaoPesquisa(true);
  }, []);

  async function handleClick({ target: { name, id } }) {
    const novasComidas = await buscarComidasPorCategoria(name);
    setlistaDeCategoria(novasComidas);
    setClickInfo(id);
    if (clickInfo === 'Primeira Vez') return setToggle(!toggle);
    if (clickInfo !== id) return setToggle(false);
    setToggle(!toggle);
  }

  function handleClickAll() {
    setToggle(true);
  }

  function renderCards() {
    if (comidas && toggle && apiResult === null) {
      return <CartaoReceitaComidas resultadoApi={ comidas } />;
    } if (!toggle && listaDeCategoria !== undefined) {
      return <CartaoReceitaComidas resultadoApi={ listaDeCategoria } />;
    } if (apiResult !== null && apiResult.length > 1) {
      return <CartaoReceitaComidas resultadoApi={ apiResult } />;
    }
  }

  return (
    <div>
      <Header />
      {!categoriasComidas
        ? <h1>Carregando ...</h1>
        : categoriasComidas.map(({ strCategory }) => (
          <button
            type="button"
            key={ strCategory }
            name={ strCategory }
            id={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ handleClick }
          >
            {strCategory}
          </button>))}
      <button
        type="button"
        key="all"
        name="all"
        id="all"
        data-testid="All-category-filter"
        onClick={ handleClickAll }
      >
        All
      </button>

      {renderCards()}

      {apiResult !== null
      && apiResult.length === 1
      && tituloDaPagina === 'Comidas'
      && <Redirect to={ `/comidas/${apiResult[0].idMeal}` } /> }
      <Footer />
    </div>
  );
}

export default Comidas;
