import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import ContextReceitas from '../context/ContextReceitas';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Botao from './Botao';
import Imagem from './Imagem';
import shareIcon from '../images/shareIcon.svg';
import CarrosselBebidas from './CarrosselBebidas';
import BotaoDetalhes from './BotaoDetalhes';
import BotaoCoracao from './BotaoCoracao';
import { objectToArrayComidas, clickButton } from '../services/funcoesRandom';

const UM_SEGUNDO = 1000;
const CINCO_SEGUNDO = 5000;
const SEIS = 6;
function CartaoDetalhesComidas({ path }) {
  const [cor, setCor] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [recomendacaoLocal, setRecomendacaoLocal] = useState([]);
  const { detalhesComidas, setReceitaEmProgresso } = useContext(ContextReceitas);

  function coracao() {
    if (cor) {
      const info = {
        id: detalhesComidas.idMeal,
        type: 'comida',
        area: detalhesComidas.strArea,
        category: detalhesComidas.strCategory,
        alcoholicOrNot: '',
        name: detalhesComidas.strMeal,
        image: detalhesComidas.strMealThumb,
      };
      setCor(!cor);
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      return storage === null
        ? localStorage.setItem('favoriteRecipes', JSON.stringify([info]))
        : localStorage.setItem('favoriteRecipes', JSON.stringify([...storage, info]));
    }
    setCor(!cor);
  }

  function aparecerDica() {
    copy(`http://localhost:3000${path}`);
    setTimeout(() => setVisibility(true), UM_SEGUNDO);
    setTimeout(() => setVisibility(false), CINCO_SEGUNDO);
  }

  useEffect(() => {
    (async function () {
      const recomendacao = (await (await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')).json()).drinks.slice(0, SEIS);
      setRecomendacaoLocal(recomendacao);
      setReceitaEmProgresso(detalhesComidas);
    }());
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites === null) return setCor(true);
    if (favorites !== null && favorites
      .some((element) => element.id === detalhesComidas.idMeal)) return setCor(false);
  }, []);

  return (
    <>
      <Imagem
        testid="recipe-photo"
        src={ detalhesComidas.strMealThumb }
        alt={ detalhesComidas.strMeal }
      />
      <h1 data-testid="recipe-title">{ detalhesComidas.strMeal }</h1>
      {visibility && <h1>Link copiado!</h1>}
      <Botao
        testid="share-btn"
        tipo="Compartilhar"
        src={ shareIcon }
        func={ aparecerDica }
      />
      <BotaoCoracao
        testid="favorite-btn"
        tipo="Favoritar"
        src={ cor ? whiteHeartIcon : blackHeartIcon }
        func={ coracao }
      />

      <h2 data-testid="recipe-category">{ detalhesComidas.strCategory }</h2>
      { objectToArrayComidas(detalhesComidas) }
      <span data-testid="instructions">{ detalhesComidas.strInstructions }</span>
      <iframe
        data-testid="video"
        src={ detalhesComidas.strYoutube
          ? detalhesComidas.strYoutube.replace(/com/i, 'com/embed') : '' }
        width="420"
        height="315"
        title="YouTube"
        allowFullScreen
      />
      <CarrosselBebidas listItem={ recomendacaoLocal } />
      <BotaoDetalhes
        nome={ clickButton(detalhesComidas) }
        id={ detalhesComidas.idMeal }
      />
    </>
  );
}

CartaoDetalhesComidas.propTypes = {
  path: PropTypes.string.isRequired,
};

export default CartaoDetalhesComidas;
