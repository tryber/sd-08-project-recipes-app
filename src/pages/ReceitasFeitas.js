import React from 'react';
import Footer from '../components/Footer';

function ReceitasFeitas() {
  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drink
      </button>
      <Footer />
    </div>
  );
}

export default ReceitasFeitas;
