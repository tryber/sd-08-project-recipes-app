/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Button,
} from '@material-ui/core';
import {
  Share as ShareIcon,
} from '@material-ui/icons';
import RecomendationsCarousel from '../../components/RecomendationsCarousel';
import FavoriteButton from '../../components/FavoriteButton';
import Loading from '../../components/animation/Loading';
import {
  checkDoneRecipes,
  checkProgressRecipes,
} from '../../services/localStorage';

import './styles.css';

const DetailsFood = () => {
  const NUMBER_OF_RECOMENDATIONS = 6;
  const { id } = useParams();
  const history = useHistory();

  const [recipeDetails, setRecipeDetails] = useState('');
  const [recomendations, setRecomendations] = useState([]);
  const [bottomButtonText, setBottomButtonText] = useState('Iniciar receita');
  const [copiedLink, setCopiedLink] = useState(false);

  const recipeDetailsURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const drinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const fetchData = async (url, callback) => {
    const results = await fetch(url)
      .then((response) => response.json())
      .then((data) => data);
    callback(results);
  };

  useEffect(() => {
    fetchData(recipeDetailsURL, (results) => setRecipeDetails(results.meals[0]));
  }, []);
  useEffect(() => {
    fetchData(drinksURL, (results) => setRecomendations(
      results.drinks.slice(0, NUMBER_OF_RECOMENDATIONS),
    ));
  }, []);
  useEffect(() => {
    if (checkDoneRecipes('comida', id)) setBottomButtonText('');
    else if (checkProgressRecipes('meal', id)) setBottomButtonText('Continuar Receita');
  }, []);

  const ingredientsList = () => {
    const MAX_NUMBER_OF_INGREDIENTS = 20;
    const arrayOfIngredients = [];
    for (let index = 1; index <= MAX_NUMBER_OF_INGREDIENTS; index += 1) {
      arrayOfIngredients.push(
        {
          ingredient: recipeDetails[`strIngredient${index}`],
          measure: recipeDetails[`strMeasure${index}`],
        },
      );
    }
    const filtered = arrayOfIngredients.filter((prop) => prop.ingredient);
    return filtered;
  };

  const embedVideoLink = (link) => {
    const videoId = link.split('v=')[1];
    const embedSrc = `https://www.youtube.com/embed/${videoId}`;
    return embedSrc;
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={ 12 }>
        {(recipeDetails && recomendations)
          ? (
            <Card>
              <CardContent>
                <img
                  src={ recipeDetails.strMealThumb }
                  alt={ recipeDetails.idMeal }
                  data-testid="recipe-photo"
                  className="recipe-photo"
                />
                <Typography data-testid="recipe-title">
                  {recipeDetails.strMeal}
                </Typography>
                <Typography data-testid="recipe-category">
                  {recipeDetails.strCategory}
                </Typography>
                <FavoriteButton id={ id } recipe={ recipeDetails } type="comida" />
                <Button
                  data-testid="share-btn"
                  onClick={ () => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopiedLink(true);
                  } }
                >
                  <ShareIcon />
                  {copiedLink ? <span>Link copiado!</span> : null}
                </Button>
                <List>
                  { ingredientsList().map((ingredientAndMeasure, index) => (
                    <ListItem key={ index }>
                      <ListItemText
                        primary={ ingredientAndMeasure.ingredient }
                        secondary={ ingredientAndMeasure.measure }
                        data-testid={ `${index}-ingredient-name-and-measure` }
                      />
                    </ListItem>
                  ))}
                </List>
                <Typography data-testid="instructions">
                  {recipeDetails.strInstructions}
                </Typography>
                <CardMedia
                  component="iframe"
                  src={ embedVideoLink(recipeDetails.strYoutube) }
                  data-testid="video"
                />
                { recomendations
                  ? <RecomendationsCarousel recomendations={ recomendations } />
                  : <p>Loading</p> }
                {bottomButtonText
                  ? (
                    <AppBar
                      data-testid="start-recipe-btn"
                      position="fixed"
                      color="primary"
                      style={ { top: 'auto',
                        bottom: 0 } }
                    >
                      <Button
                        variant="contained"
                        onClick={ () => history.push(`/comidas/${id}/in-progress`) }
                      >
                        {bottomButtonText}
                      </Button>
                    </AppBar>)
                  : null}
              </CardContent>
            </Card>)
          : <Loading /> }
      </Grid>
    </Grid>
  );
};

export default DetailsFood;
