import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';

import { fetchRandom } from '../../services/API';

export default function SurpriseMe({ path }) {
  const history = useHistory();
  const randomRecipe = async () => {
    let type = '';
    if (path.includes('comidas')) {
      type = 'comidas';
    } else {
      type = 'bebidas';
    }
    const id = await fetchRandom(type);
    history.push(`/${type}/${id}`);
  };

  return (
    <button
      data-testid="explore-surprise"
      onClick={ randomRecipe }
      type="button"
    >
      Me Surpreenda!
    </button>
  );
}

SurpriseMe.propTypes = {
  path: PropTypes.string.isRequired,
};
