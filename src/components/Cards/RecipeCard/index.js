import {
  Card, CardActionArea, CardContent, CardMedia, Grid, Typography,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { useHistory } from 'react-router-dom';

const RecipeCard = ({ title, thumbnail, index, clickRedirectPath, cardType }) => {
  const history = useHistory();

  return (
    <Grid item xs={ 6 } sm={ 4 } md={ 3 } lg={ 2 }>
      <Card
        data-testid={ `${index}-${cardType}-card` }
        className="recipe-card"
        onClick={ () => history.push(clickRedirectPath) }
      >
        <CardActionArea>
          <CardMedia
            data-testid={ `${index}-card-img` }
            component="img"
            image={ thumbnail }
            src={ thumbnail }
            title={ title }
          />
        </CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            data-testid={ `${index}-card-name` }
          >
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
RecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  clickRedirectPath: PropTypes.string.isRequired,
  cardType: PropTypes.string.isRequired,
};
export default RecipeCard;
