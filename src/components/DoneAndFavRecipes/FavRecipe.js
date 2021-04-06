import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, CardMedia,
  Grid, IconButton, Typography, Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import './styles.css';
import shareIcon from '../../images/shareIcon.svg';
import favIcon from '../../images/blackHeartIcon.svg';

const TWO_SECONDS = 2000;

const FavRecipe = ({ recipe, index }) => {
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);
  const { id, name, type, area, category,
    image, alcoholicOrNot, removeFav } = recipe;

  const recipePath = `/${type}s/${id}`;

  const pushToRecipePath = () => history.push(recipePath);

  const topText = () => {
    if (type === 'comida') {
      if (category && area) return `${area} - ${category}`;
      if (category) return `${category}`;
      return `${area}`;
    }
    return `${alcoholicOrNot}`;
  };

  const nameAndCategoryComponent = () => (
    <Grid item xs={ 12 }>
      <Typography
        variant="body2"
        data-testid={ `${index}-horizontal-top-text` }
        color="textSecondary"
        gutterBottom
      >
        { `${topText()}` }
      </Typography>
      <Typography
        variant="body1"
        data-testid={ `${index}-horizontal-name` }
        color="textPrimary"
        onClick={ pushToRecipePath }
        gutterBottom
      >
        { `${name}` }
      </Typography>
    </Grid>
  );

  const copyToClipBoard = () => {
    const { protocol, host } = window.location;
    navigator.clipboard.writeText(`${protocol}//${host}${recipePath}`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), TWO_SECONDS);
  };

  const shareIconComponent = () => (
    <IconButton onClick={ copyToClipBoard }>
      <img
        src={ shareIcon }
        alt="share icon"
        data-testid={ `${index}-horizontal-share-btn` }
        style={ { width: '22px' } }
      />
    </IconButton>
  );

  const favIconComponent = () => (
    <IconButton onClick={ () => removeFav(id) }>
      <img
        src={ favIcon }
        alt="favorited icon"
        data-testid={ `${index}-horizontal-favorite-btn` }
        style={ { width: '22px' } }
      />
    </IconButton>
  );

  return (
    <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
      <Card style={ { display: 'flex' } }>
        <CardMedia
          data-testid={ `${index}-horizontal-image` }
          component="img"
          image={ image }
          title={ name }
          style={ { maxWidth: '50%' } }
          onClick={ pushToRecipePath }
        />
        <CardContent className="done-recipe-content">
          { nameAndCategoryComponent() }
          <Grid container item xs={ 12 } justify="space-around">
            { shareIconComponent() }
            { favIconComponent() }
          </Grid>
        </CardContent>
      </Card>
      <Collapse in={ showAlert } className="copy-to-clip-board-alert">
        <Alert onClose={ () => {} }>
          Link copiado!
        </Alert>
      </Collapse>
    </Grid>
  );
};

FavRecipe.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    removeFav: PropTypes.func.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
export default FavRecipe;
