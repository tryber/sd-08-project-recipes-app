import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Ingredientes() {
  const FINAL_NULL = 4;
  const {
    recipe,
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

  const objPronto = newObj.reduce((acumulador, valorAtual) => {
    const firstNull = valorAtual.substr(0, FINAL_NULL);
    if (valorAtual[0] !== ' ' && firstNull !== 'null') {
      return acumulador.concat(valorAtual);
    }
    return acumulador;
  }, []);

  return (
    <div className="ingredientes">
      <h2>Ingredientes</h2>
      <ul>
        {objPronto.map((ingrediente, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingrediente}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ingredientes;
