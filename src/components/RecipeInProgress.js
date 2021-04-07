import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {
  getIngredientes,
  checkIngrediente,
  copyLink,
  checkFavoritos,
  adicionarFavorito,
  salvarReceitaFeita,
} from '../services/services';
import {
  getReceitaBebidasDetalhesPorId,
  getReceitaComidasDetalhesPorId,
} from '../services/BuscaNasAPIs';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

// Página de ingredientes de comida para teste (retirado do avaliador): http://localhost:3000/comidas/52771/in-progress
// Página de ingredientes de bebida para teste (retirado do avaliador): http://localhost:3000/bebidas/178319/in-progress

const renderReceitaFoto = (tipoReceita, detalhesDaReceita) => (
  <img
    className="sizeFoto"
    alt={ `Foto ${tipoReceita}` }
    width="100%"
    data-testid="recipe-photo"
    src={ detalhesDaReceita[`str${tipoReceita === 'meals' ? 'Meal' : 'Drink'}Thumb`] }
  />
);

const ativarBotaoFinalizarReceita = (
  setDesativarBotaoFinalizar,
  listaIngredientesState,
  tipoReceita,
  receitaItemId,
) => {
  const listaReceitas = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (listaReceitas) {
    const ingredientesMarcados = listaReceitas[tipoReceita][receitaItemId];
    if (ingredientesMarcados) {
      if (listaIngredientesState.length === ingredientesMarcados.length) {
        setDesativarBotaoFinalizar(false);
      } else {
        setDesativarBotaoFinalizar(true);
      }
    }
  }
};

function RecipeInProgress() {
  const [detalhesDaReceita, setDetalhesDaReceita] = useState({});
  const [listaIngredientesState, setListaIngredientesState] = useState([]);
  const [
    listaControleIngredientesMarcados,
    setListaControleIngredientesMarcados,
  ] = useState([]);
  const [listaIngredientesMarcados, setListaIngredientesMarcados] = useState([]);
  const [desativarBotaoFinalizar, setDesativarBotaoFinalizar] = useState(true);
  const [exibirMensagem, setExibirMensagem] = useState('hidden');
  const [isFavorito, setIsFavorito] = useState(false);

  const history = useHistory();

  // https://scrimba.com/scrim/cyp4KdH3
  const matchObject = useRouteMatch();
  const receitaItemId = matchObject.params.id;
  const tipoReceita = matchObject.path === '/comidas/:id/in-progress'
    ? 'meals'
    : 'cocktails';

  useEffect(() => {
    const getReceitaDetalhes = async () => {
      const arrayReceitaDetalhes = await tipoReceita === 'cocktails'
        ? await getReceitaBebidasDetalhesPorId(receitaItemId)
        : await getReceitaComidasDetalhesPorId(receitaItemId);
      if (arrayReceitaDetalhes) setDetalhesDaReceita(arrayReceitaDetalhes[0]);
    };

    getReceitaDetalhes();
  }, [receitaItemId, tipoReceita]);

  useEffect(() => {
    const ingredientesMarcados = () => {
      const listaReceitas = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (listaReceitas) {
        const listaIngredientes = listaReceitas[tipoReceita][receitaItemId];
        setListaIngredientesMarcados(listaIngredientes);
      }
    };
    ingredientesMarcados();
  }, [receitaItemId, tipoReceita, listaControleIngredientesMarcados]);

  useEffect(() => {
    const carregarIngredientes = () => {
      setListaIngredientesState(getIngredientes(detalhesDaReceita));
    };
    checkFavoritos(receitaItemId, setIsFavorito);
    carregarIngredientes();
  }, [receitaItemId, tipoReceita, detalhesDaReceita, setIsFavorito]);

  useEffect(() => {
    ativarBotaoFinalizarReceita(
      setDesativarBotaoFinalizar,
      listaIngredientesState,
      tipoReceita,
      receitaItemId,
    );
  }, [receitaItemId, tipoReceita, listaIngredientesState]);

  const loadListaDeIngredientes = () => (
    <ul>
      {getIngredientes(detalhesDaReceita).map((item, index) => (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <label htmlFor={ `${item.ingredient}` }>
            <input
              type="checkbox"
              value={ `${item.ingredient}` }
              onChange={ (e) => {
                checkIngrediente(e.target.value, tipoReceita, receitaItemId);
                setListaControleIngredientesMarcados(
                  [...listaControleIngredientesMarcados, `${item.ingredient}`],
                );
                ativarBotaoFinalizarReceita(
                  setDesativarBotaoFinalizar,
                  listaIngredientesState,
                  tipoReceita,
                  receitaItemId,
                );
              } }
              checked={ (listaIngredientesMarcados)
                ? listaIngredientesMarcados.includes(`${item.ingredient}`)
                : false }
            />
            <img
              width="30px"
              src={ `https://www.themealdb.com/images/ingredients/${item.ingredient}.png` }
              alt="ingredient"
            />
            {' '}
            {item.measure}
            {' '}
            -
            {' '}
            {item.ingredient}
          </label>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      { renderReceitaFoto(tipoReceita, detalhesDaReceita) }

      <h3 data-testid="recipe-title">Receita em progresso</h3>

      <input
        type="image"
        src={ ShareIcon }
        alt="Botão Compartilhar"
        data-testid="share-btn"
        className="share"
        onClick={ () => copyLink(window.location.href, setExibirMensagem) }
      />

      <button
        type="button"
        onClick={ () => adicionarFavorito(
          receitaItemId,
          tipoReceita,
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

      <h5 hidden={ exibirMensagem }>Link copiado!</h5>

      <h4 width="90%" data-testid="recipe-category">
        {
          tipoReceita === 'meals'
            ? detalhesDaReceita.strCategory
            : detalhesDaReceita.strAlcoholic
        }
      </h4>

      { loadListaDeIngredientes() }

      <p width="90%" data-testid="instructions">{detalhesDaReceita.strInstructions}</p>

      <Button
        className="fixButton"
        type="button"
        width="100%"
        data-testid="finish-recipe-btn"
        disabled={ desativarBotaoFinalizar }
        onClick={ () => {
          salvarReceitaFeita(receitaItemId, tipoReceita, detalhesDaReceita);
          history.push('/receitas-feitas');
        } }
      >
        Finalizar
      </Button>
    </div>
  );
}

export default RecipeInProgress;
