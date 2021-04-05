import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextReceitas from './ContextReceitas';
import { buscarCategoriaBebida } from '../services/buscarCategoriasBebidas';
import { buscarCategoriaComida } from '../services/buscarCategoriasComidas';
import { resultadoApiComidas } from '../services/fetchComidas';
import { resultadoApiBebidas } from '../services/fetchBebidas';

function ProviderReceitas({ children }) {
  const [deveriaRedirecionar, setDeveriaRedirecionar] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [showDefault, setShowDefault] = useState(true);
  const [logedIn, setLoged] = useState(0);
  const [receitaEmProgresso, setReceitaEmProgresso] = useState({});
  const [bebidas, setBebidas] = useState();
  const [comidas, setComidas] = useState();
  const [listaDeCategoria, setlistaDeCategoria] = useState();
  const [search, setSearch] = useState({ type: 's', value: '' });
  const [apiResult, setApiResult] = useState([]);
  const [tituloDaPagina, enviarTituloDaPagina] = useState('Comidas');
  const [statusBotaoPesquisa, mudarStatusBotaoPesquisa] = useState(true);
  const [categoriasComidas, setCategoriasComidas] = useState([]);
  const [categoriasBebidas, setCategoriasBebidas] = useState([]);
  const mensagem = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  const [detalhesComidas, setDetalhesComidas] = useState([]);
  const [detalhesBebidas, setDetalhesBebidas] = useState([]);

  useEffect(() => {
    async function fetchComida() {
      if (search.type === 'f' && search.search.length > 1) {
        return window.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      const comidasResultado = tituloDaPagina.includes('Comidas')
        ? await resultadoApiComidas(search.type, search.search)
        : await resultadoApiBebidas(search.type, search.search);

      if (comidasResultado === null && search.value !== '') return window.alert(mensagem);

      setApiResult(comidasResultado);
    }
    fetchComida();
  }, [search]);

  const dados = {
    search,
    setSearch,
    apiResult,
    setApiResult,
    logedIn,
    setLoged,
    tituloDaPagina,
    enviarTituloDaPagina,
    statusBotaoPesquisa,
    mudarStatusBotaoPesquisa,
    categoriasBebidas,
    categoriasComidas,
    bebidas,
    setBebidas,
    comidas,
    setComidas,
    listaDeCategoria,
    setlistaDeCategoria,
    toggle,
    setToggle,
    deveriaRedirecionar,
    setDeveriaRedirecionar,
    detalhesComidas,
    setDetalhesComidas,
    detalhesBebidas,
    setDetalhesBebidas,
    receitaEmProgresso,
    setReceitaEmProgresso,
    showDefault,
    setShowDefault,
  };

  useEffect(() => {
    async function funcBuscarCategoriaComida() {
      const categoriaComida = await buscarCategoriaComida();
      setCategoriasComidas(categoriaComida);
    }
    funcBuscarCategoriaComida();
  }, []);

  useEffect(() => {
    async function funcBuscarCategoriaBebida() {
      const categoriaBebida = await buscarCategoriaBebida();
      setCategoriasBebidas(categoriaBebida);
    }
    funcBuscarCategoriaBebida();
  }, []);

  return (
    <ContextReceitas.Provider value={ dados }>
      { children }
    </ContextReceitas.Provider>
  );
}

export default ProviderReceitas;

ProviderReceitas.propTypes = {
  children: PropTypes.element.isRequired,
};
