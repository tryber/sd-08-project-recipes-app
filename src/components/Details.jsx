import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './Button';
import Recomendations from './Recomendations';
import '../css/Details.css';
import shareIcon from '../images/share.svg';
import FavoriteButton from './FavoriteButton';
import YtVideo from './YtVideo';
import buttonTextChanges from '../services/Complexity';

const copy = require('clipboard-copy');

function Details(props) {
  const history = useHistory();
  const { currentFood, ingredients } = props;
  const [disabled, setDisabled] = useState(false);
  const [btnLabel, setLabel] = useState('Iniciar Receita');
  const [doneList] = useState(JSON.parse(
    localStorage.getItem('doneRecipes') || '[]',
  ));
  const [message, setMessage] = useState(false);

  useEffect(() => {
    function disabledBtn() {
      const currentId = currentFood.idMeal || currentFood.idDrink;
      const filterFood = doneList.filter((filter) => (
        filter.id === currentId
      ));
      if (filterFood.length > 0) {
        setDisabled(true);
      }
      if (buttonTextChanges(currentFood)) {
        setLabel('Continuar Receita');
      }
    }
    disabledBtn();
  }, [currentFood]);

  const historyPath = () => (
    history.push(`${history.location.pathname}/in-progress`)
  );

  function loadingScreen() {
    return (
      <div>LOADING...</div>
    );
  }

  function renderMessage() {
    return (
      <span className="pink-color">Link copiado!</span>
    );
  }

  function shareButtonClick() {
    setMessage(true);
    copy(`http://localhost:3000${history.location.pathname}`);
  }

  function renderDetails() {
    return (
      <div className="background-dark details-container">
        <section className="detail-image-container">
          <img
            src={ currentFood.strMealThumb || currentFood.strDrinkThumb }
            data-testid="recipe-photo"
            alt="Thumbnail"
          />
          <h4
            data-testid="recipe-category"
          >
            { currentFood.strAlcoholic
              ? currentFood.strAlcoholic : currentFood.strCategory }
          </h4>
        </section>
        <section className="detail-top-bar">
          <h1 data-testid="recipe-title">
            { currentFood.strMeal || currentFood.strDrink }
          </h1>
          <FavoriteButton currentFood={ currentFood } />
        </section>
        <h3>Ingredientes</h3>
        <ul>
          { ingredients.map((curr, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              { curr }
            </li>
          ))}
        </ul>
        <h3>Instruções</h3>
        <p data-testid="instructions">{ currentFood.strInstructions }</p>
        <section className="detail-bottom-content">
          <input
            type="image"
            src={ shareIcon }
            alt="share"
            data-testid="share-btn"
            onClick={ shareButtonClick }
            width="30px"
          />
          { message ? renderMessage() : null }
          <YtVideo currentFood={ currentFood } />
          <Recomendations />
          <Button
            disabled={ disabled }
            className="start-recipe-btn"
            datatestid="start-recipe-btn"
            label={ btnLabel }
            onClick={ historyPath }
          />
        </section>
      </div>
    );
  }

  return (
    <div className="detailsDiv">
      { currentFood.strCategory ? renderDetails() : loadingScreen() }
    </div>
  );
}

Details.propTypes = {
  currentFood: PropTypes.objectOf(PropTypes.any),
  ingredients: PropTypes.arrayOf(PropTypes.string),
};

Details.defaultProps = {
  currentFood: {},
  ingredients: [],
};

export default Details;
