import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function IngredientsCocktail(props) {
  const { ingredients, measure, id } = props;

  const [ingredientsList, setIngredientsList] = useState([]);

  const parseIngredient = () => {
    const newList = ingredients.map((item, index) => ({
      id: index,
      ingredient: item,
      measure: measure[index],
      checked: false,
    }));
    const store = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (store.cocktails[id]) {
      store.cocktails[id].forEach((item) => {
        const index = newList.findIndex((i) => i.ingredient === item);
        newList[index].checked = true;
      });
    }
    return newList;
  };

  const setStorage = () => {
    const store = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const aux = [...ingredientsList];
    const newList = aux.filter((item) => item.checked).map((i) => i.ingredient);
    store.cocktails[id] = newList;
    localStorage.setItem('inProgressRecipes', JSON.stringify(store));
  };

  useEffect(() => {
    setIngredientsList(parseIngredient());
  }, [id]);

  const handleIngredients = ({ target }) => {
    const newList = [...ingredientsList];
    const listIndex = newList.findIndex((i) => i.ingredient === target.name);
    newList[listIndex].checked = target.checked;
    setIngredientsList(newList);
    setStorage();
  };

  return (
    <ul>
      { ingredientsList.length > 0 && ingredientsList.map((ing) => (
        <li
          key={ ing.id }
        >
          <label htmlFor={ ing.ingredient } data-testid={ `${ing.id}-ingredient-step` }>
            <input
              type="checkbox"
              name={ ing.ingredient }
              value={ ing.ingredient }
              checked={ ing.checked }
              onChange={ handleIngredients }
            />
            { `${measure[ing.id]} of ${ing.ingredient}` }
          </label>
        </li>
      )) }
    </ul>
  );
}

IngredientsCocktail.propTypes = {
  ingredient: PropTypes.array,
  measure: PropTypes.array,
  id: PropTypes.string,
}.isRequired;

export default IngredientsCocktail;
