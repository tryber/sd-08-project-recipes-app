import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, CardDeck, Card } from 'react-bootstrap';
import {
  getReceitaBebidasDetalhesPorId,
  getReceitaComidasDetalhesPorId,
  getRecomendacoesReceitasBebidas,
  getRecomendacoesReceitasComidas,
} from '../services/BuscaNasAPIs';
import {
  getIngredientes,
  checkReceitaCompleta,
  copyLink,
  checkFavoritos,
  adicionarFavorito,
} from '../services/services';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

const NUMERO_MAXIMO_RECOMENDACOES_RECEITAS = 6;

const renderReceitaFoto = (tipoReceita, detalhesDaReceita) => (
  <img
    className="sizeFoto"
    alt={ `Foto ${tipoReceita}` }
    width="100%"
    data-testid="recipe-photo"
    src={ detalhesDaReceita[`str${tipoReceita}Thumb`] }
  />
);
const renderReceitaTitulo = (tipoReceita, detalhesDaReceita) => (
  <h3 data-testid="recipe-title">{ detalhesDaReceita[`str${tipoReceita}`] }</h3>
);
const renderReceitaBotaoCompartilhar = (setExibirMensagem) => (
  <input
    type="image"
    src={ ShareIcon }
    alt="Botão Compartilhar"
    data-testid="share-btn"
    className="share"
    onClick={ () => copyLink(window.location.href, setExibirMensagem) }
  />
);
const renderReceitaMensagem = (exibirMensagem) => (
  <h5 hidden={ exibirMensagem }>Link copiado!</h5>
);
const renderReceitaCategoria = (tipoReceita, detalhesDaReceita) => (
  <h4 width="90%" data-testid="recipe-category">
    {
      tipoReceita === 'Meal'
        ? detalhesDaReceita.strCategory
        : detalhesDaReceita.strAlcoholic
    }
  </h4>
);
const renderReceitaInstrucoes = (detalhesDaReceita) => (
  <p width="90%" data-testid="instructions">{detalhesDaReceita.strInstructions}</p>
);
const renderReceitaVideo = (detalhesDaReceita) => (
  // https://stackoverflow.com/questions/44715819/iframes-and-react-js-how-to-embed-a-youtube-video-into-my-app
  <iframe
    title="video"
    data-testid="video"
    // https://stackoverflow.com/questions/20498831/refused-to-display-in-a-frame-because-it-set-x-frame-options-to-sameorigin
    src={ detalhesDaReceita.strYoutube
      && detalhesDaReceita.strYoutube.replace('watch?v=', 'embed/') }
    width="90%"
  />
);
const renderReceitaQuadroRecomendacao = (tipoReceita, recomendacoesReceitas, history) => {
  const tipoRecomendacaoReceita = tipoReceita === 'Meal' ? 'Drink' : 'Meal';
  const id = `id${tipoRecomendacaoReceita}`;
  const nomeReceita = `str${tipoRecomendacaoReceita}`;
  const src = `str${tipoRecomendacaoReceita}Thumb`;
  const path = tipoRecomendacaoReceita === 'Meal' ? 'comidas' : 'bebidas';
  return (
    <div className="cardBody">
      <CardDeck className="m-2 d-flex flex-row flex-wrap justify-content-center">
        {
          recomendacoesReceitas && recomendacoesReceitas.map((receita, index) => (
            <Card
              key={ receita[id] }
              data-testid={ `${index}-recomendation-card` }
              className="col-5 m-2 border-dark"
              hidden={ index > 1 ? 'hidden' : '' }
              onClick={ () => history.push(`/${path}/${receita[id]}`) }
            >
              <Card.Img
                variant="top"
                data-testid={ `${index}-card-img` }
                src={ receita[src] }
              />
              <Card.Body>
                <Card.Title data-testid={ `${index}-recomendation-title` }>
                  { receita[nomeReceita] }
                </Card.Title>
              </Card.Body>
            </Card>
          ))
        }
      </CardDeck>
    </div>
  );
};
const loadListaDeIngredientes = (detalhesDaReceita) => (
  <ul>
    {getIngredientes(detalhesDaReceita).map((item, index) => (
      <li
        key={ `ìngredient${index}` }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        <img
          width="30px"
          src={ `https://www.themealdb.com/images/ingredients/${item.ingredient}.png` }
          alt="ingredient"
        />
        {`${item.measure} - ${item.ingredient}`}
      </li>
    ))}
  </ul>
);

function DetalhesReceita({ receitaItemId, tipoReceita }) {
  const [detalhesDaReceita, setDetalhesDaReceita] = useState({});
  const [recomendacoesReceitas, setRecomendacoesReceitas] = useState([]);
  const [exibirMensagem, setExibirMensagem] = useState('hidden');
  const [exibirBotaoIniciarReceita, setExibirBotaoIniciarReceita] = useState('');
  const [
    textoBotaoIniciarReceita,
    setTextoBotaoIniciarReceita,
  ] = useState('Iniciar Receita');
  const [isFavorito, setIsFavorito] = useState(false);
  const history = useHistory();

  const renderReceitaBotaoFavoritar = () => {
    const novoTipoReceita = tipoReceita === 'Drink' ? 'cocktails' : 'meals';
    return (
      <button
        type="button"
        onClick={ () => adicionarFavorito(
          receitaItemId,
          novoTipoReceita,
          detalhesDaReceita,
          setIsFavorito,
        ) }
      >
        <img
          src={ isFavorito ? BlackHeartIcon : WhiteHeartIcon }
          alt="Botão Favoritar"
          data-testid="favorite-btn"
        />
      </button>
    );
  };

  useEffect(() => {
    const getRecomendacoesReceitas = async () => {
      const arrayRecomendacoesReceitas = tipoReceita === 'Drink'
        ? await getRecomendacoesReceitasComidas()
        : await getRecomendacoesReceitasBebidas();
      if (arrayRecomendacoesReceitas) {
        arrayRecomendacoesReceitas.length = NUMERO_MAXIMO_RECOMENDACOES_RECEITAS;
        setRecomendacoesReceitas(arrayRecomendacoesReceitas);
      }
    };

    getRecomendacoesReceitas();
  }, [tipoReceita]);

  useEffect(() => {
    const getReceitaDetalhes = async () => {
      const arrayReceitaDetalhes = tipoReceita === 'Drink'
        ? await getReceitaBebidasDetalhesPorId(receitaItemId)
        : await getReceitaComidasDetalhesPorId(receitaItemId);
      if (arrayReceitaDetalhes) setDetalhesDaReceita(arrayReceitaDetalhes[0]);
    };

    getReceitaDetalhes();

    const checkReceitaProgresso = () => {
      const listReceitasProgresso = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (listReceitasProgresso) {
        let idsReceitasProgresso = [];
        if (tipoReceita === 'Meal') {
          idsReceitasProgresso = Object.keys(listReceitasProgresso.meals);
        } else {
          idsReceitasProgresso = Object.keys(listReceitasProgresso.cocktails);
        }
        if (idsReceitasProgresso.includes(receitaItemId)) {
          setTextoBotaoIniciarReceita('Continuar Receita');
        }
      }
    };
    checkReceitaProgresso();
    checkReceitaCompleta(receitaItemId, setExibirBotaoIniciarReceita);
  }, [receitaItemId, tipoReceita]);

  useEffect(() => {
    checkFavoritos(receitaItemId, setIsFavorito);
  }, [receitaItemId, setIsFavorito]);

  const renderReceitaIniciarReceita = () => (
    <Button
      className="fixButton"
      type="button"
      width="100%"
      hidden={ `${exibirBotaoIniciarReceita}` }
      data-testid="start-recipe-btn"
      onClick={ () => {
        if (tipoReceita === 'Drink') {
          history.push(`/bebidas/${receitaItemId}/in-progress`);
        } else {
          history.push(`/comidas/${receitaItemId}/in-progress`);
        }
      } }
    >
      { textoBotaoIniciarReceita }
    </Button>
  );

  return (
    <section className="w-100">
      { renderReceitaFoto(tipoReceita, detalhesDaReceita) }
      { renderReceitaTitulo(tipoReceita, detalhesDaReceita) }
      { renderReceitaBotaoCompartilhar(setExibirMensagem) }
      { renderReceitaBotaoFavoritar() }
      { renderReceitaMensagem(exibirMensagem) }
      { renderReceitaCategoria(tipoReceita, detalhesDaReceita) }
      { loadListaDeIngredientes(detalhesDaReceita) }
      { renderReceitaInstrucoes(detalhesDaReceita) }
      {/* https://pt-br.reactjs.org/docs/conditional-rendering.html */}
      { tipoReceita === 'Meal'
        && renderReceitaVideo(detalhesDaReceita)}
      { renderReceitaQuadroRecomendacao(tipoReceita,
        recomendacoesReceitas,
        history) }
      { renderReceitaIniciarReceita() }
    </section>
  );
}

DetalhesReceita.propTypes = {
  receitaItemId: PropTypes.string.isRequired,
  tipoReceita: PropTypes.string.isRequired,
};

export default DetalhesReceita;
