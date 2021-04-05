import React, { useContext, useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import ContextReceitas from '../context/ContextReceitas';
import Header from '../components/Header';
import TextoFeitas from '../components/TextoFeitas';
import BotaoCoracao from '../components/BotaoCoracao';
import BotaoFeitas from '../components/BotaoFeitas';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const UM_SEGUNDO = 1000;
const CINCO_SEGUNDOS = 5000;

function ReceitasFavoritas() {
  const [cor] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [receitasFavoritas, setReceitasFavoritas] = useState([]);
  const [receitasProntas, setReceitasProntas] = useState([]);

  const {
    enviarTituloDaPagina,
    mudarStatusBotaoPesquisa,
  } = useContext(ContextReceitas);
  useEffect(() => {
    enviarTituloDaPagina('Receitas Favoritas');
    mudarStatusBotaoPesquisa(false);
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newStorage = [...storage];
    setReceitasFavoritas(newStorage);
    setReceitasProntas(newStorage);
  }, []);

  function coracao({ target: { name } }) {
    if (!cor) {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newStorage = storage.filter((element) => element.id !== name);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
      setReceitasFavoritas(newStorage);
    }
  }

  function botaoClick({ target: { name } }) {
    if (name === 'todos') return setReceitasFavoritas(receitasProntas);
    const newArr = receitasFavoritas.filter((element) => element.type === name);
    setReceitasFavoritas(newArr);
  }
  return (
    <div>
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
      {receitasFavoritas.map((element, index) => (
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
          <BotaoCoracao
            name={ element.id }
            testid={ `${index}-horizontal-favorite-btn` }
            tipo="Favoritar"
            src={ cor ? whiteHeartIcon : blackHeartIcon }
            func={ coracao }
          />
        </div>
      ))}
    </div>
  );
}

export default ReceitasFavoritas;
