import React, { useContext, useState } from 'react';
import ContextReceitas from '../context/ContextReceitas';
import '../styles/paginas.css';

function BarraPesquisa() {
  const {
    setSearch,
    setComidas,
    setBebidas,
    tituloDaPagina,
  } = useContext(ContextReceitas);
  const [pesquisaLocal, setPesquisaLocal] = useState({});
  function changeHandle({ target: { name, value } }) {
    setPesquisaLocal({ ...pesquisaLocal, [name]: value });
  }
  function handleClick() {
    setSearch(pesquisaLocal);
    if (tituloDaPagina === 'Comidas') {
      setComidas(false);
    }setBebidas(false);
  }

  return (
    <form className="form-filtros">
      <input
        type="text"
        name="search"
        data-testid="search-input"
        onChange={ changeHandle }
        placeholder="Digite"
      />
      <div className="div-filtros">
        <label
          className="search input-radio"
          htmlFor="i"
        >
          Ingrediente
          <input
            id="i"
            type="radio"
            name="type"
            value="i"
            data-testid="ingredient-search-radio"
            onChange={ changeHandle }
          />
        </label>
        <label
          className="search input-radio"
          htmlFor="s"
        >
          Nome
          <input
            id="s"
            type="radio"
            name="type"
            value="s"
            data-testid="name-search-radio"
            onChange={ changeHandle }
          />
        </label>
        <label
          className="search input-radio"
          htmlFor="f"
        >
          Primeira Letra
          <input
            id="f"
            type="radio"
            name="type"
            value="f"
            data-testid="first-letter-search-radio"
            onChange={ changeHandle }
          />
        </label>
      </div>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="exec-search-btn"
        className="btn btn-secondary btn-category botao-filtro"
      >
        {' '}
        PROCURAR
      </button>

    </form>
  );
}
export default BarraPesquisa;
