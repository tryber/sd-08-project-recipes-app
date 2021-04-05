import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FavoriteRecipesActions } from '../store/ducks/favoriteRecipes';

import BigCard from './BigCard';
import BigCardHeader from './BigCardHeader';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

import styles from '../styles/components/FavoriteRecipeCard.module.css';

const FavoriteRecipeCard = ({ recipe, index, removeRecipe }) => {
  function renderImage() {
    return (
      <Link to={ `${recipe.type}s/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
    );
  }

  function renderInfo() {
    return (
      <>
        <BigCardHeader
          recipe={ recipe }
          index={ index }
        />
        <div className={ styles.controls }>
          <ShareButton
            link={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }
            testId={ `${index}-horizontal-share-btn` }
          />
          <FavoriteButton
            onClick={ () => removeRecipe(recipe.id) }
            testId={ `${index}-horizontal-favorite-btn` }
          />
        </div>
      </>
    );
  }

  return (
    <BigCard
      image={ renderImage() }
      info={ renderInfo() }
    />
  );
};

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  removeRecipe: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(FavoriteRecipesActions, dispatch));

export default connect(null, mapDispatchToProps)(FavoriteRecipeCard);
