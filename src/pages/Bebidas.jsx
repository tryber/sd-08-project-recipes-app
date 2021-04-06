import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import ContextReceitas from '../context/ContextReceitas';
import { fetchBebidasAPI } from '../services/fetchBebidas';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartaoReceitaBebidas from '../components/CartaoReceitaBebidas';
import { buscarBebidasPorCategoria } from '../services/buscarCategoriasBebidas';

function Bebidas() {
  const {
    apiResult,
    tituloDaPagina,
    enviarTituloDaPagina,
    mudarStatusBotaoPesquisa,
    categoriasBebidas,
    bebidas,
    setBebidas,
    setlistaDeCategoria,
    listaDeCategoria,
    setToggle,
    toggle,
    showDefault,
  } = useContext(ContextReceitas);

  const [clickInfo, setClickInfo] = useState('Primeira Vez');

  useEffect(() => {
    async function listaBebidasAPI() {
      const bebidasAPI = await fetchBebidasAPI();
      setBebidas(bebidasAPI);
    }
    listaBebidasAPI();
    enviarTituloDaPagina('Bebidas');
    mudarStatusBotaoPesquisa(true);
  }, []);
  console.log(bebidas);
  async function handleClick({ target: { name, id } }) {
    const novasBebidas = await buscarBebidasPorCategoria(name);
    setlistaDeCategoria(novasBebidas);
    setClickInfo(id);
    if (clickInfo === 'Primeira Vez') return setToggle(!toggle);
    if (clickInfo !== id) return setToggle(false);
    setToggle(!toggle);
  }

  function handleClickAll() {
    setToggle(true);
    // setApiResult(null);
  }

  function renderCards() {
    if (bebidas && toggle && showDefault) {
      return <CartaoReceitaBebidas resultadoApi={ bebidas } />;
    } if (!toggle && listaDeCategoria !== undefined) {
      return <CartaoReceitaBebidas resultadoApi={ listaDeCategoria } />;
    } if (apiResult !== null && apiResult.length > 1) {
      return <CartaoReceitaBebidas resultadoApi={ apiResult } />;
    }
  }

  return (
    <div>
      <Header />
      <div className="btn-group div-botoes" role="group">
        {!categoriasBebidas
          ? <h1>Carregando ...</h1>
          : categoriasBebidas.map(({ strCategory }) => (
            <button
              type="button"
              key={ strCategory }
              name={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              id={ strCategory }
              onClick={ handleClick }
              className="btn btn-secondary btn-category-bebidas"
              style={ { backgroundColor: ' rgb(236, 159, 5)', border: 'none' } }
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
          className="btn btn-secondary btn-category-bebidas"
          style={ { backgroundColor: ' rgb(236, 159, 5)', border: 'none' } }
        >
          All
        </button>
      </div>

      <div className="div-cards">
        {renderCards()}
      </div>
      {apiResult !== null
      && apiResult.length === 1
      && tituloDaPagina === 'Bebidas'
      && <Redirect to={ `/bebidas/${apiResult[0].idDrink}` } /> }

      <Footer />
    </div>

  );
}
export default Bebidas;
