import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';

function IngredientsCheckbox({ objDetail, id, url }) {
  const { setVerifyCheckbox } = useContext(RecipeContext);
  const verifyIngredientsChecked = () => {
    if (localStorage.getItem('inProgressRecipes') !== null) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (url.includes('comida')) {
        return inProgressRecipes.meals[id];
      }
      if (url.includes('bebida')) {
        return inProgressRecipes.cocktails[id];
      }
    } else { return ['textoaleatorio']; }
  };

  const verifyCheckbox = ({ target }) => {
    const array = [];
    const arrayLi = target.parentNode.parentNode.parentNode.childNodes;
    arrayLi.forEach((elem) => {
      const checkbox = elem.firstChild.firstChild;
      if (checkbox.checked) {
        array.push(true);
      } else {
        array.push(false);
      }
    });
    // console.log(array);
    setVerifyCheckbox(array);
  };

  const handleChange = ({ target }) => {
    const ol = target.parentNode.parentNode.parentNode;
    const lista = ol.childNodes;
    const listaDeIngredientes = [];
    // console.log(ol);

    lista.forEach((elem) => {
      const checkbox = elem.firstChild.firstChild;
      // console.log(checkbox);
      if (checkbox.checked) {
        listaDeIngredientes.push(checkbox.id);
      }
    });

    // console.log(listaDeIngredientes);
    if (localStorage.getItem('inProgressRecipes') !== null) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (url.includes('comidas')) {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          ...inProgressRecipes,
          meals: {
            ...inProgressRecipes.meals,
            [id]: listaDeIngredientes,
          },
        }));
      }
      if (url.includes('bebidas')) {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          ...inProgressRecipes,
          cocktails: {
            ...inProgressRecipes.cocktails,
            [id]: listaDeIngredientes,
          },
        }));
      }
    } else {
      if (url.includes('comidas')) {
        localStorage.setItem(
          'inProgressRecipes', JSON.stringify({ meals: { [id]: listaDeIngredientes } }),
        );
      }
      if (url.includes('bebidas')) {
        localStorage.setItem('inProgressRecipes', JSON.stringify(
          { cocktails: { [id]: listaDeIngredientes } },
        ));
      }
    }
    const SELECTED_LI = 'selected-li';
    if (!target.checked) {
      target.parentNode.classList.remove(SELECTED_LI);
    } else { target.parentNode.classList.add(SELECTED_LI); }
  };
  const getIngredients = () => {
    const ingredientes = Object.entries(objDetail[0]);

    const measure = ingredientes.filter((elem) => (
      elem[0].includes('strMeasure') && elem[1] !== null && elem[1] !== ''
    ));
    const filtering = ingredientes.filter((element) => (
      element[0].includes('strIngredient') && element[1] !== null && element[1] !== ''));

    const results = filtering.map((elem, index) => {
      const isChecked = verifyIngredientsChecked().some((e) => e === elem[1]);
      return (
        <li
          name="li-ingredients"
          key={ elem[1] }
          data-testid={ `${index}-ingredient-step` }
        >
          <label
            htmlFor={ elem[1] }
            className={ isChecked ? 'selected-li' : '' }
          >
            <input
              defaultChecked={ isChecked }
              onChange={ handleChange }
              type="checkbox"
              id={ elem[1] }
            />
            {elem[1]}
            <span>{measure[index] === undefined ? '' : measure[index][1]}</span>
          </label>
        </li>);
    });

    return results;
  };

  return (
    <ol
      onChange={ verifyCheckbox }
      className="ingredient-list"
      id="ingredient-list"
    >
      {getIngredients()}
    </ol>
  );
}

IngredientsCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  objDetail: PropTypes.shape(
    PropTypes.any,
  ).isRequired,
};

export default IngredientsCheckbox;
