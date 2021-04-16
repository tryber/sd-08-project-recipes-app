import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import verifyInProgress from '../services/verifyInProgress';
import '../styles/IngredientesEmProcesso.css';

function IngredientesEmProcesso({ id, type }) {
  const FINAL_NULL = 4;
  const {
    recipe,
    countCheck,
    setCountCheck,
  } = useContext(MyContext);
  const newObj = [];
  let cont = 1;
  const keys = Object.keys(recipe);

  keys.map((key) => {
    if (key.includes('strIngredient')) {
      newObj.push(
        `${recipe[`strIngredient${cont}`]} - ${recipe[`strMeasure${cont}`]}`,
      );
      cont += 1;
    }
    return null;
  });

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!storage) {
      verifyInProgress(id, type);
    }
  }, [id, type]); // []

  const objPronto = newObj.reduce((acumulador, valorAtual) => {
    const firstNull = valorAtual.substr(0, FINAL_NULL);
    if (valorAtual[0] !== ' ' && firstNull !== 'null') {
      return acumulador.concat(valorAtual);
    }
    return acumulador;
  }, []);

  function verifyInputChecked() {
    const arrayChecked = document.getElementsByTagName('input');
    console.log('tamanho Array', arrayChecked.length);
    console.log('contador', countCheck);
    // ;
  }

  function handleClick({ target }) {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const previouslyIngredientsUsed = inProgress[type][id];
    const ingredientClickedNow = target.id;
    if (target.checked) {
      target.parentNode.classList.add('riscado');
      setCountCheck(countCheck + 1);
      if (previouslyIngredientsUsed === []) {
        previouslyIngredientsUsed.push(ingredientClickedNow);
      } else if (!previouslyIngredientsUsed
        .some((ingredient) => ingredient === ingredientClickedNow)) {
        previouslyIngredientsUsed.push(ingredientClickedNow);
        console.log();
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    } else {
      target.parentNode.classList.remove('riscado');
      setCountCheck(countCheck - 1);
      previouslyIngredientsUsed
        .splice(previouslyIngredientsUsed.indexOf(ingredientClickedNow), 1);
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    }
    verifyInputChecked();
  }

  function inputChecked(index) {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const ingredientsUsed = inProgress[type][id];
    const input = document.getElementsByTagName('input')[index];
    if (input) {
      if (ingredientsUsed.includes(input.id)) {
        input.setAttribute('checked', true);
      } else {
        input.removeAttribute('checked');
      }
    }
    return null;
  }

  return (
    <div className="ingredientes">
      <h2>Ingredientes</h2>
      <ul>
        {objPronto.map((ingrediente, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>
            <label htmlFor={ ingrediente }>
              <input
                id={ index }
                type="checkbox"
                name={ ingrediente }
                value={ ingrediente }
                onClick={ handleClick }
                checked={ inputChecked(index) }
              />
              {ingrediente}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

IngredientesEmProcesso.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default IngredientesEmProcesso;
