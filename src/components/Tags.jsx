import React from 'react';
import PropTypes from 'prop-types';

function Tags({ array }) {
  return (
    <>
      { array.slice(0, 2).map((element) => (
        <h1
          key={ element }
          data-testid={ `0-${element}-horizontal-tag` }
        >
          {element}
        </h1>
      ))}
    </>
  );
}

Tags.propTypes = {
  array: PropTypes.arrayOf.isRequired,
};

export default Tags;
