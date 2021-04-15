import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Button from '../components/Button';
import Header from '../components/Header';
import shareIcon from '../images/share.svg';

const copy = require('clipboard-copy');

function renderTag(data, index) {
  console.log(data.tags.length);
  if (data.tags.length === 0) {
    return (
      <h6>No Tags</h6>
    );
  } if (data.tags.length === 1) {
    return (
      <h6 data-testid={ `${index}-${data.tags[0]}-horizontal-tag` }>
        { data.tags[0]}
      </h6>
    );
  } if (data.tags.length >= 2) {
    return (
      <>
        <h6 data-testid={ `${index}-${data.tags[0]}-horizontal-tag` }>
          { data.tags[0]}
        </h6>
        <h6 data-testid={ `${index}-${data.tags[1]}-horizontal-tag` }>
          { data.tags[1]}
        </h6>
      </>
    );
  }
}

function renderRecipe(data, index) {
  console.log(data);
  switch (data.type) {
  case 'comida':
    return (
      <>
        <h5 data-testid={ `${index}-horizontal-top-text` }>
          { `${data.area} - ${data.category}` }
        </h5>
        <div className="tag-container">
          { renderTag(data, index) }
        </div>
      </>
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
      <span className="pink-color">Link copiado!</span>
    );
  }
}

function doneList() {
  const localData = JSON.parse(localStorage.getItem('doneRecipes'));
  return localData || [];
}

function ReceitasFeitas() {
  const BOOLEAN_TRUE = true;
  const history = useHistory();
  const [message, setMessage] = useState([false, '']);
  const [recipesList, setList] = useState(doneList());

  return (
    <>
      <Header title="Receitas Feitas" disableBtn={ BOOLEAN_TRUE } />
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
              <p data-testid={ `${index}-horizontal-done-date` }>{ data.doneDate }</p>
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
              </footer>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default ReceitasFeitas;
