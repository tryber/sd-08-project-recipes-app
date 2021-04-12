import React from 'react';
import components from '../components/index';

function ExploreFoods() {
  return (
    <div>
      <components.Header title="Explorar Comidas" />
      <main className="explore-container">
        <components.ExploreByIngredientsButton />
        <components.ExploreByOriginationButton />
        <components.SurpriseMeButton />
      </main>
      <components.Footer />
    </div>
  );
}

export default ExploreFoods;
