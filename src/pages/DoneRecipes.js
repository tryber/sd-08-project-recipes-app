import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Container from '../components/Container';
import RecipesFilter from '../components/RecipesFilter';
import DoneRecipeCard from '../components/DoneRecipeCard';

import styles from '../styles/pages/DoneRecipes.module.css';

const filterMethods = {
  Food: (recipe) => recipe.type === 'comida',
  Drinks: (recipe) => recipe.type === 'bebida',
};

const DoneRecipes = ({ doneRecipes }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredResults = doneRecipes.filter((recipe) => (
    filterMethods[selectedFilter] ? filterMethods[selectedFilter](recipe) : true
  ));

  return (
    <Container>
      <Header title="Receitas Feitas" />
      <div className={ styles.doneRecipesContainer }>
        <RecipesFilter setSelectedFilter={ setSelectedFilter } />
        { filteredResults.map((recipe, index) => (
          <DoneRecipeCard index={ index } key={ index } recipe={ recipe } />)) }
      </div>
    </Container>
  );
};

DoneRecipes.propTypes = {
  doneRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ doneRecipes }) => ({
  doneRecipes: doneRecipes.doneRecipes,
});

export default connect(mapStateToProps)(DoneRecipes);
