import React from 'react';

export default function IngredientsList(list) {
  return (
    <ul>
      {list.map((item, index) => (
        <li key={ index }>
          <label htmlFor="ingredient">
            <input
              type="checkbox"
              name="ingredient"
              data-testid={ `${index}-ingredient-step` }
            />
          </label>
        </li>
      ))}
    </ul>
  );
}
