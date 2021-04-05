import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import InProgressCard from '../../components/Card/InProgressCard';
import { getFoodFiltredById } from '../../services/api';
import useFavoritesHook from '../hooks/useFavoritesHook';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FoodInProgress(props) {
  const { match: { url, params: { id } } } = props;
  const [filteredById, setFilteredById] = useState('');
  const history = useHistory();
  const [favorites, updateFavorites] = useFavoritesHook();
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const [ingredientsAndMeasuresList, setIngredientsAndMeasuresList] = useState([]);
  const isEmpty = (obj) => Object.keys(obj).length === 0; // verifica se o objeto está vazio;

  const { strCategory,
    strMeal, strMealThumb, strInstructions, strArea } = filteredById;

  const copyFunction = () => {
    copy(window.location.href.replace('/in-progress', ''));
    setCopied(!copied);
  };

  function handleFavorite() {
    const newRecipe = {
      id,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    updateFavorites(newRecipe, isFavorite);
    setIsFavorite(!isFavorite);
  }

  useEffect(() => {
    function checkIsFavorite() {
      return favorites
        .find((fav) => fav.id === id)
        ? setIsFavorite(true)
        : setIsFavorite(false);
    }
    checkIsFavorite();
  }, [id, favorites]);

  const buttonsDiv = (
    <div className="icons">
      <button type="button" data-testid="share-btn" onClick={ copyFunction }>
        <img src={ shareIcon } alt="Compartilhar" />
        {copied && 'Link copiado!'}
      </button>
      <button
        type="button"
        onClick={ handleFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="Compartilhar"
        />
      </button>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Finalizar
      </button>
    </div>
  );

  function createIngredientList(receita) {
    const ING_INDEX = 15;
    let ingredientList = [];
    let quantitiesList = [];
    for (let i = 1; i <= ING_INDEX; i += 1) {
      ingredientList = [...ingredientList, receita[`strIngredient${i}`]];
      quantitiesList = [...quantitiesList, receita[`strMeasure${i}`]];
    }
    const ingredientAndMeasure = quantitiesList
      .filter((qua) => qua !== null && qua !== '')
      .map((mes, index) => `${mes} ${ingredientList[index]}`);
    return setIngredientsAndMeasuresList(ingredientAndMeasure);
  }

  useEffect(() => {
    const requestingAPI = async () => {
      const fetchById = await getFoodFiltredById(id);
      setFilteredById(fetchById);
    }; requestingAPI();
  }, [id]);

  useEffect(() => {
    if (!isEmpty(filteredById)) {
      console.log('IS NOT EMPTY');
      createIngredientList(filteredById);
    }
  }, [filteredById]);

  return (
    <div>
      {!isEmpty(filteredById)
        ? (
          <section style={ { display: 'flex', flexFlow: 'column wrap' } }>
            {buttonsDiv}
            <InProgressCard
              url={ url }
              id={ id }
              category={ strCategory }
              title={ strMeal }
              img={ strMealThumb }
              ingredients={ ingredientsAndMeasuresList }
              // alcohol={ strAlcoholic }
              instructions={ strInstructions }
            />
          </section>) : <h1>Carregando comida...</h1> }
    </div>
  );
}

FoodInProgress.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default FoodInProgress;
