import React, { useContext, useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import ContextReceitas from '../context/ContextReceitas';
import Header from '../components/Header';
import BotaoFeitas from '../components/BotaoFeitas';
import TextoFeitas from '../components/TextoFeitas';
import shareIcon from '../images/shareIcon.svg';
import Tags from '../components/Tags';
import BotaoCoracao from '../components/BotaoCoracao';

function ReceitasFeitas() {
  const [visibility, setVisibility] = useState(false);
  const [receitasProntas, setReceitasProntas] = useState([]);
  const [salvarReceitasProntas, setSalvarReceitasProntas] = useState([]);
  const UM_SEGUNDO = 1000;
  const CINCO_SEGUNDOS = 5000;

  const {
    enviarTituloDaPagina,
    mudarStatusBotaoPesquisa,
  } = useContext(ContextReceitas);
  useEffect(() => {
    enviarTituloDaPagina('Receitas Feitas');
    mudarStatusBotaoPesquisa(false);
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    setReceitasProntas(storage);
    setSalvarReceitasProntas(storage);
  }, []);

  function botaoClick({ target: { name } }) {
    console.log(salvarReceitasProntas);
    if (name === 'todos') return setReceitasProntas(salvarReceitasProntas);
    const newArr = receitasProntas.filter((element) => element.type === name);
    setReceitasProntas(newArr);
  }

  return (
    <>
      <Header />
      <BotaoFeitas
        testid="filter-by-all-btn"
        texto="All"
        tipo="todos"
        func={ botaoClick }
      />
      <BotaoFeitas
        testid="filter-by-food-btn"
        texto="Food"
        tipo="comida"
        func={ botaoClick }
      />
      <BotaoFeitas
        testid="filter-by-drink-btn"
        texto="Drinks"
        tipo="bebida"
        func={ botaoClick }
      />
      {receitasProntas.map((element, index) => (
        <div key={ element.id }>
          <Link to={ `/${element.type}s/${element.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ element.image }
              alt={ element.name }
              width="60"
              height="60"
            />
          </Link>
          <TextoFeitas
            testid={ `${index}-horizontal-top-text` }
            texto={ element.type === 'comida'
              ? `${element.area} - ${element.category}`
              : element.alcoholicOrNot }
          />
          <Link to={ `/${element.type}s/${element.id}` }>
            <TextoFeitas
              testid={ `${index}-horizontal-name` }
              texto={ element.name }
            />
          </Link>
          <TextoFeitas
            testid={ `${index}-horizontal-done-date` }
            texto={ element.doneDate }
          />
          {visibility && <h1>Link copiado!</h1>}
          <BotaoCoracao
            testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            func={ () => {
              setTimeout(() => setVisibility(true), UM_SEGUNDO);
              setTimeout(() => setVisibility(false), CINCO_SEGUNDOS);
              copy(`http://localhost:3000/${element.type}s/${element.id}`);
            } }
          />
          <Tags array={ element.tags } />
        </div>
      ))}

    </>
  );
}

export default ReceitasFeitas;
