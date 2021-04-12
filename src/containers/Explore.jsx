import React from 'react';
import components from '../components/index';

function Explore() {
  return (
    <div>
      <components.Header title="Explorar" />
      <main className="explore-container">
        <components.ExploreFoodsButton />
        <components.ExploreDrinksButton />
      </main>
      <components.Footer />
    </div>
  );
}

export default Explore;
