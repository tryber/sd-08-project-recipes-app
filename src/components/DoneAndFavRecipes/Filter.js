/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';

import ActiveButtons from '../../lib/ActiveButtons';

const Filter = ({ updateState, type }) => {
  const handleActiveButtons = new ActiveButtons('.MuiButtonGroup-root', type);

  useEffect(() => {
    handleActiveButtons.init();
  }, []);

  const handleClick = (evt, filterContent) => {
    updateState(filterContent);
    handleActiveButtons.onClick(evt);
  };

  return (
    <Grid container justify="center" alignItems="center" className="done-recipes-filter">
      <ButtonGroup variant="contained" fullWidth>
        <Button onClick={ (evt) => handleClick(evt, '') } data-testid="filter-by-all-btn">
          All
        </Button>
        <Button
          onClick={ (evt) => handleClick(evt, 'comida') }
          data-testid="filter-by-food-btn"
        >
          Food
        </Button>
        <Button
          onClick={ (evt) => handleClick(evt, 'bebida') }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </Button>
      </ButtonGroup>
    </Grid>
  );
};

Filter.propTypes = {
  updateState: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default Filter;
