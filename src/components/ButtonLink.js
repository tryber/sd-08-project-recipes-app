import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import './ButtonLink.css';

const ButtonLink = ({
  func, LinkT, name, className, size, variant, color, type, datatest,
}) => (
  <Box m={ 0.25 }>
    <Link to={ LinkT } className="text-link">
      <Button
        className={ className }
        size={ size }
        variant={ variant }
        color={ color }
        type={ type }
        data-testid={ datatest }
        onClick={ func }
      >
        <Typography variant="button">{name}</Typography>
      </Button>
    </Link>
  </Box>
);

ButtonLink.propTypes = {
  LinkT: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  datatest: PropTypes.string.isRequired,
  func: PropTypes.func,
};

ButtonLink.defaultProps = {
  func: () => {},
};

export default ButtonLink;
