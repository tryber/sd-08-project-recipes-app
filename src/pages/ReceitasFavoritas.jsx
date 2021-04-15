import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Button from '../components/Button';
import Header from '../components/Header';
import shareIcon from '../images/share.svg';
import blackHeartIcon from '../images/heart2-full.svg';

const copy = require('clipboard-copy');

function renderRecipe(data, index) {
  switch (data.type) {
  case 'comida':
    return (
      <p data-testid={ `${index}-horizontal-top-text` }>
        { `${data.area} - ${data.category}` }
      </p>
    );
  case 'bebida':
    return (
      <p data-testid={ `${index}-horizontal-top-text` }>{ data.alcoholicOrNot }</p>
    );
  default:
    break;
  }
}

function renderMessage(index, expectedIndex) {
  if (index === expectedIndex) {
    return (
      <span>Link copiado!</span>
    );
  }
}

function doneList() {
  const localData = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return localData || [];
}

function ReceitasFavoritas() {
  const BOOLEAN_TRUE = true;
  const history = useHistory();
  const [message, setMessage] = useState([false, '']);
  const [recipesList, setList] = useState(doneList);

  function disfavorite(id) {
    console.log(id);
    const removeFavorite = recipesList.filter((favorites) => favorites.id !== id);
    setList(removeFavorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
  }

  return (
    <div className="backgrond">
      <Header title="Receitas Favoritas" disableBtn={ BOOLEAN_TRUE } />
      <section className="filter-buttons">
        <Button
          label="All"
          datatestid="filter-by-all-btn"
          onClick={ () => setList(doneList()) }
        />
        <Button
          label="Food"
          datatestid="filter-by-food-btn"
          onClick={ () => setList(doneList().filter((data) => data.type === 'comida')) }
        />
        <Button
          label="Drinks"
          datatestid="filter-by-drink-btn"
          onClick={ () => setList(doneList().filter((data) => data.type === 'bebida')) }
        />
      </section>
      <section className="saved-recipes">
        { recipesList.map((data, index) => (
          <div key={ index } className="card">
            <div className="top-container">
              <input
                type="image"
                data-testid={ `${index}-horizontal-image` }
                src={ data.image }
                alt="receita"
                name={ data.name }
                width="100%"
                onClick={ () => history.push(`${data.type}s/${data.id}`) }
              />
            </div>
            <div className="bot-container">
              <h4
                href={ `${data.type}s/${data.id}` }
                data-testid={ `${index}-horizontal-name` }
              >
                { data.name }
              </h4>
              { renderRecipe(data, index) }
              <footer>
                { message ? renderMessage(index, message[1]) : null }
                <input
                  type="image"
                  src={ shareIcon }
                  alt="share"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => setMessage([true, index]) || copy(`http://localhost:3000/${data.type}s/${data.id}`) }
                />
                <input
                  type="image"
                  src={ blackHeartIcon }
                  alt="blackHeartIcon"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ () => disfavorite(data.id) }
                />
              </footer>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ReceitasFavoritas;
