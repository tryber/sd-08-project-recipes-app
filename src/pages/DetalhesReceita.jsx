import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { buscarDetalhesComida } from '../services/fetchComidas';
import { buscarDetalhesBebidas } from '../services/fetchBebidas';
import ContextReceitas from '../context/ContextReceitas';

import CartaoDetalhesComidas from '../components/CartaoDetalhesComidas';
import CartaoDetalhesBebidas from '../components/CartaoDetalhesBebidas';
import '../styles/detalhesReceitas.css';

function DetalhesReceita(props) {
  const { match: { params: { id } } } = props;
  const { match: { path } } = props;
  const { setDetalhesComidas, setDetalhesBebidas } = useContext(ContextReceitas);
  const rota = '/comidas/:id';
  const { location: { pathname } } = props;
  useEffect(() => {
    async function funcBuscarDetalhes() {
      const detalhes = path === rota
        ? await buscarDetalhesComida(id)
        : await buscarDetalhesBebidas(id);
      return path === rota
        ? setDetalhesComidas(detalhes)
        : setDetalhesBebidas(detalhes);
    }
    funcBuscarDetalhes();
  }, []);

  if (path === rota) return <CartaoDetalhesComidas path={ pathname } />;
  return <CartaoDetalhesBebidas path={ pathname } />;
}

DetalhesReceita.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default DetalhesReceita;
