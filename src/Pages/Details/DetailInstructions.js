import React from 'react';
import PropTypes from 'prop-types';

function DetailInstructions(props) {
  const { instructions } = props;
  return (
    <section>
      <h1>Instruções</h1>
      <p data-testid="instructions">
        { instructions }
      </p>
    </section>
  );
}

DetailInstructions.propTypes = {
  instructions: PropTypes.string,
};

DetailInstructions.defaultProps = {
  instructions: '',
};

export default DetailInstructions;
