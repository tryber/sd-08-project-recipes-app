import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';

import styles from '../styles/components/BigCardHeader.module.css';

const BigCardHeader = ({ recipe, showShare, index }) => {
  const { area, name } = recipe;
  const category = recipe.alcoholicOrNot || recipe.category;
  const link = `http://localhost:3000/${recipe.type}s/${recipe.id}`;

  return (
    <div className={ styles.bigCardHeader }>
      <div className={ styles.row }>
        <p
          data-testid={ `${index}-horizontal-top-text` }
          className={ styles.category }
        >
          { area ? `${area} - ${category}` : `${category}` }
        </p>
        { showShare && (
          <ShareButton
            testId={ `${index}-horizontal-share-btn` }
            link={ link }
          />)}
      </div>
      <Link
        to={ `${recipe.type}s/${recipe.id}` }
        data-testid={ `${index}-horizontal-name` }
        className={ styles.name }
      >
        { name }
      </Link>
    </div>
  );
};

BigCardHeader.defaultProps = {
  showShare: false,
};

BigCardHeader.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    area: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  showShare: PropTypes.bool,
  index: PropTypes.number.isRequired,
};

export default BigCardHeader;
