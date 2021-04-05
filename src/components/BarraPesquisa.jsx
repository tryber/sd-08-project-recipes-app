import React, { useContext, useState } from 'react';
import ContextReceitas from '../context/ContextReceitas';

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
    <form>
      <input
        type="text"
        name="search"
        data-testid="search-input"
        onChange={ changeHandle }
      />
      <label
        className="search"
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
        className="search"
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
        className="search"
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
      <button
        type="button"
        onClick={ handleClick }
        data-testid="exec-search-btn"
      >
        {' '}
        PROCURAR
      </button>

    </form>
  );
}
export default BarraPesquisa;
