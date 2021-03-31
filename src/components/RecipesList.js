import React, { useContext } from 'react';
import Card from './Card';
import RecipeContext from '../context/RecipeContext';

function RecipesList() {
  const MAX_ITEMS = 12;
  const { meals } = useContext(RecipeContext);

  return (
    <div>
      {meals
        .map((elem, index) => {
          if (index < MAX_ITEMS) {
            return <Card key={ index } card={ elem } index={ index } />;
          }
          return '';
        })}
    </div>
  );
}

export default RecipesList;
