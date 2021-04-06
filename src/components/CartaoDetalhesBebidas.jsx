import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import ContextReceitas from '../context/ContextReceitas';
import Botao from './Botao';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Imagem from './Imagem';
import CarrosselComidas from './CarrosselComidas';
import BotaoDetalhes from './BotaoDetalhes';
import BotaoCoracao from './BotaoCoracao';
import { clickButtonBebidas, objectToArrayComidas } from '../services/funcoesRandom';
import '../styles/detalhesReceitas.css';

const UM_SEGUNDO = 1000;
const CINCO_SEGUNDO = 5000;
const SEIS = 6;
function CartaoDetalhesBebidas({ path }) {
  const [cor, setCor] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [recomendacaoLocal, setRecomendacaoLocal] = useState([]);
  const { detalhesBebidas, setReceitaEmProgresso } = useContext(ContextReceitas);

  function coracao() {
    if (cor) {
      const info = {
        id: detalhesBebidas.idDrink,
        type: 'bebida',
        area: '',
        category: detalhesBebidas.strCategory,
        alcoholicOrNot: detalhesBebidas.strAlcoholic,
        name: detalhesBebidas.strDrink,
        image: detalhesBebidas.strDrinkThumb,
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
      const recomendacao = (await (await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')).json()).meals.slice(0, SEIS);
      setRecomendacaoLocal(recomendacao);
      setReceitaEmProgresso(detalhesBebidas);
    }());
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites === null) return setCor(true);
    if (favorites !== null && favorites
      .some((element) => element.id === detalhesBebidas.idDrink)) return setCor(false);
  }, []);

  return (
    <>
      <h1
        data-testid="recipe-title"
        className="title-detalhes"
      >
        { detalhesBebidas.strDrink }
      </h1>
      <div className="div-img-e-btn">
        <Imagem
          testid="recipe-photo"
          alt={ detalhesBebidas.strDrink }
          src={ detalhesBebidas.strDrinkThumb }
        />
        {visibility && <h1>Link copiado!</h1>}
        <div className="div-btn-fav-comp">
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
        </div>
      </div>
      <h2
        data-testid="recipe-category"
        className="detalhe-categoria"
      >
        { detalhesBebidas.strAlcoholic }
      </h2>
      { objectToArrayComidas(detalhesBebidas) }
      <h4>Method of preparation: </h4>
      <span
        data-testid="instructions"
        className="preparo"
      >
        { detalhesBebidas.strInstructions }
      </span>
      <CarrosselComidas listItem={ recomendacaoLocal } />
      <BotaoDetalhes
        nome={ clickButtonBebidas(detalhesBebidas) }
        id={ detalhesBebidas.idDrink }
      />

    </>
  );
}

CartaoDetalhesBebidas.propTypes = {
  path: PropTypes.string.isRequired,
};

export default CartaoDetalhesBebidas;
