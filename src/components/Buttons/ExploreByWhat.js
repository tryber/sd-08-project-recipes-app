import React from 'react';
import PropTypes from 'prop-types';

const ExploreByWhat = ({ ptBr, dataTestId, onClick }) => {
  const testId = dataTestId === 'surprise'
    ? (
      <button
        data-testid={ `explore-${dataTestId}` }
        style={ { boxSizing: 'content-box', margin: '10px', padding: '5px' } }
        type="button"
        onClick={ onClick }
      >
        {ptBr}
      </button>
    )
    : (
      <button
        data-testid={ `explore-by-${dataTestId}` }
        style={ { boxSizing: 'content-box', margin: '10px', padding: '5px' } }
        type="button"
        onClick={ onClick }
      >
        {`Por ${ptBr}`}
      </button>
    );
  return (
    <div>{testId}</div>
  );
};

ExploreByWhat.propTypes = {
  ptBr: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ExploreByWhat;
