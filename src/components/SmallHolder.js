import { Box, Paper, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import './SmallHolder.css';

const SmallHolder = ({ className, name }) => (
  <div>
    <Box
      component="span"
      color="primary"
      direction="row"
      justify="space-around"
      alignItems="center"
    >
      <Paper display="inline" className={ className }>
        <Typography variant="button" data-testid="profile-email">{name}</Typography>
      </Paper>
    </Box>
  </div>
);

SmallHolder.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SmallHolder;
