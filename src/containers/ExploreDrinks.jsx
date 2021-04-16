import React from 'react';
import components from '../components/index';

function ExploreDrinks() {
  return (
    <div>
      <components.Header title="Explorar Bebidas" />
      <main className="explore-container">
        <components.ExploreDrinksByIngredients />
        <components.SurpriseMeButton />
      </main>
      <components.Footer />
    </div>
  );
}

export default ExploreDrinks;
