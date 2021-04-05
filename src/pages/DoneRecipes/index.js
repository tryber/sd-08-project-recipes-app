import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import FilterButton from '../../components/Buttons/FilterButton';
import DoneRecipeCard from '../../components/cards/DoneRecipeCard';
import '../../components/cards/doneCards.css';

function DoneRecipes({ history }) {
  const [filterBy, setFilterBy] = useState('');
  const dones = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const recipes = dones.filter((recipe) => recipe.type.includes(filterBy));

  return (
    <>
      <Header history={ history } />
      <main>
        <section className="filters">
          <FilterButton filter="all" setFilterBy={ setFilterBy } />
          <FilterButton filter="food" setFilterBy={ setFilterBy } />
          <FilterButton filter="drink" setFilterBy={ setFilterBy } />
        </section>
        <section className="cards">
          { recipes.map((recipe, index) => (
            <DoneRecipeCard
              index={ index }
              key={ recipe.id }
              recipe={ recipe }
            />
          )) }
        </section>
      </main>
    </>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.string.isRequired,
};

export default DoneRecipes;
