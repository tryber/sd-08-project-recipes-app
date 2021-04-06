import React from 'react';
import '../styles/detalhesReceitas.css';

function objectToArrayComidas(detalhes) {
  const ingredientes = Object.entries(detalhes).filter((e) => e[0]
    .includes('strIngredient') && e[1] !== null);
  const medidas = Object.entries(detalhes).filter((e) => e[0].includes('strMeasure'));
  return (
    <div>
      <h4>Ingredients: </h4>
      { ingredientes.map((e, i) => (
        <p
          key={ e[0] }
          data-testid={ `${i}-ingredient-name-and-measure` }
          className="ingredientes"
        >
          {`${e[1]} ${medidas[i][1] === null
            ? 'A gosto' : medidas[i][1]}`}
        </p>
      )) }
    </div>);
}

function clickButton(detalhesComidas) {
  const storageDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (storageDoneRecipes !== null && storageDoneRecipes
    .some((element) => element.id === detalhesComidas.idMeal)) return '';
  const storageProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (storageProgress !== null && Object.keys((JSON.parse(localStorage
    .getItem('inProgressRecipes'))).meals)
    .some((element) => element === detalhesComidas.idMeal)) return 'Continuar Receita';
  return 'Iniciar Receita';
}
function clickButtonBebidas(detalhesComidas) {
  const storageDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (storageDoneRecipes !== null && storageDoneRecipes
    .some((element) => element.id === detalhesComidas.idDrink)) return '';
  const storageProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (storageProgress !== null && Object.keys((JSON.parse(localStorage
    .getItem('inProgressRecipes'))).cocktails)
    .some((element) => element === detalhesComidas.idDrink)) return 'Continuar Receita';
  return 'Iniciar Receita';
}

export { objectToArrayComidas, clickButton, clickButtonBebidas };
