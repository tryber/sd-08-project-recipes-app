import React from 'react';

export default function Instructions(instruction) {
  return (
    <section>
      <p data-testid="instructions">{instruction}</p>
    </section>
  );
}
