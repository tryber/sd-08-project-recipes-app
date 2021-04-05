import React from 'react';
import { useSelector } from 'react-redux';

export default function InstructionsText() {
  const { strInstructions } = useSelector((state) => state.detailsReducer.actualRecipe);
  return (
    <div>
      <h1>Instructions</h1>
      <p data-testid="instructions">
        {strInstructions}
      </p>
    </div>
  );
}
