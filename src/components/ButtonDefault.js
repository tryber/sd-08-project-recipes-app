import React from 'react';
import { Box, Button } from '@material-ui/core';

function ButtonDefault({ func, name, className, size, variant, color, type, datatest }) {
  return (
    <Box m={ 0.25 }>
      <Button
        className={ className }
        size={ size }
        variant={ variant }
        color={ color }
        type={ type }
        data-testid={ datatest }
        onClick={ func }
      >
        {name}
      </Button>
    </Box>
  );
}

ButtonDefault.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  datatest: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,

};

export default ButtonDefault;
