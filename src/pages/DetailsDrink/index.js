/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
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

const DetailsDrink = () => {
  const NUMBER_OF_RECOMENDATIONS = 6;
  const { id } = useParams();
  const history = useHistory();

  const [recipeDetails, setRecipeDetails] = useState('');
  const [recomendations, setRecomendations] = useState([]);
  const [bottomButtonText, setBottomButtonText] = useState('Iniciar receita');
  const [copiedLink, setCopiedLink] = useState(false);

  const recipeDetailsURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const mealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const fetchData = async (url, callback) => {
    const results = await fetch(url)
      .then((response) => response.json())
      .then((data) => data);
    callback(results);
  };

  useEffect(() => {
    fetchData(recipeDetailsURL, (results) => setRecipeDetails(results.drinks[0]));
  }, []);
  useEffect(() => {
    fetchData(mealsURL, (results) => setRecomendations(
      results.meals.slice(0, NUMBER_OF_RECOMENDATIONS),
    ));
  }, []);
  useEffect(() => {
    if (checkDoneRecipes('bebida', id)) setBottomButtonText('');
    else if (checkProgressRecipes('cocktail', id)) {
      setBottomButtonText('Continuar Receita');
    }
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

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={ 12 }>
        {recipeDetails
          ? (
            <Card>
              <CardContent>
                <img
                  src={ recipeDetails.strDrinkThumb }
                  alt={ recipeDetails.idDrink }
                  data-testid="recipe-photo"
                  className="recipe-photo"
                />
                <Typography data-testid="recipe-title">
                  {recipeDetails.strDrink}
                </Typography>
                <Typography data-testid="recipe-category">
                  {recipeDetails.strAlcoholic}
                </Typography>
                <FavoriteButton id={ id } recipe={ recipeDetails } type="bebida" />
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
                { recomendations
                  ? <RecomendationsCarousel recomendations={ recomendations } />
                  : <p>Loading</p> }
                {bottomButtonText
                  ? (
                    <AppBar
                      data-testid="start-recipe-btn"
                      position="fixed"
                      color="primary"
                      style={ { top: 'auto', bottom: 0 } }
                    >
                      <Button
                        variant="contained"
                        onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
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

export default DetailsDrink;
