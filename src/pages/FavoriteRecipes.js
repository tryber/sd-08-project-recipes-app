import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Container from '../components/Container';
import RecipesFilter from '../components/RecipesFilter';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';

import styles from '../styles/pages/FavoriteRecipes.module.css';

const filterMethods = {
  Food: (recipe) => recipe.type === 'comida',
  Drinks: (recipe) => recipe.type === 'bebida',
};

const FavoriteRecipes = ({ favoriteRecipes }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredResults = favoriteRecipes.filter((recipe) => (
    filterMethods[selectedFilter] ? filterMethods[selectedFilter](recipe) : true
  ));

  return (
    <Container>
      <Header title="Receitas Favoritas" />
      <div className={ styles.favoriteRecipesContainer }>
        <RecipesFilter setSelectedFilter={ setSelectedFilter } />
        { filteredResults.map((recipe, index) => (
          <FavoriteRecipeCard index={ index } key={ index } recipe={ recipe } />)) }
      </div>
    </Container>
  );
};

FavoriteRecipes.propTypes = {
  favoriteRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ favoriteRecipes }) => ({
  favoriteRecipes: favoriteRecipes.favoriteRecipes,
});

export default connect(mapStateToProps)(FavoriteRecipes);
