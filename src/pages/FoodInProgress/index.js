/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  Checkbox,
  ListItem,
  ListItemText,
  Button,
} from '@material-ui/core';
import {
  Share as ShareIcon,
} from '@material-ui/icons';
import FavoriteButton from '../../components/FavoriteButton';
import Loading from '../../components/animation/Loading';
import {
  updateInProgressRecipe,
  getInProcessRecipe,
  saveDoneRecipe,
} from '../../services/localStorage';

const FoodInProgress = () => {
  const { id } = useParams();
  const history = useHistory();

  const [recipeDetails, setRecipeDetails] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [usedIngredients, setUsedIngredients] = useState([]);
  const [finishButton, setFinishButton] = useState(true);

  const recipeDetailsURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  const fetchData = async (url, callback) => {
    const results = await fetch(url)
      .then((response) => response.json())
      .then((data) => data);
    callback(results);
  };

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

  const handleCheckboxIngredients = (ingredient) => {
    updateInProgressRecipe('meals', id, ingredient);
    if (usedIngredients.includes(ingredient)) {
      setUsedIngredients(usedIngredients.filter((item) => item !== ingredient));
    } else {
      setUsedIngredients([...usedIngredients, ingredient]);
    }
  };

  useEffect(() => {
    fetchData(recipeDetailsURL, (results) => setRecipeDetails(results.meals[0]));
  }, []);
  useEffect(() => {
    setUsedIngredients(getInProcessRecipe('meals', id));
  }, []);
  useEffect(() => {
    if (getInProcessRecipe('meals', id).length === ingredientsList().length) {
      setFinishButton(false);
    } else setFinishButton(true);
  }, [recipeDetails, usedIngredients]);

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
                    navigator.clipboard.writeText(
                      window.location.href.replace(/\/in-progress/, ''),
                    );
                    setCopiedLink(true);
                  } }
                >
                  <ShareIcon />
                  {copiedLink ? <span>Link copiado!</span> : null}
                </Button>
                <List>
                  { ingredientsList().map((ingredientAndMeasure, index) => (
                    <ListItem key={ index } data-testid={ `${index}-ingredient-step` }>
                      <Checkbox
                        checked={
                          usedIngredients.includes(ingredientAndMeasure.ingredient)
                        }
                        color="default"
                        onChange={
                          () => handleCheckboxIngredients(ingredientAndMeasure.ingredient)
                        }
                        inputProps={ { 'aria-label': 'checkbox with default color' } }
                      />
                      <ListItemText
                        primary={ ingredientAndMeasure.ingredient }
                        secondary={ ingredientAndMeasure.measure }
                      />
                    </ListItem>
                  ))}
                </List>
                <Typography data-testid="instructions">
                  {recipeDetails.strInstructions}
                </Typography>
                <Button
                  disabled={ finishButton }
                  variant="contained"
                  data-testid="finish-recipe-btn"
                  onClick={ () => {
                    history.push('/receitas-feitas');
                    saveDoneRecipe(recipeDetails);
                  } }
                >
                  Finalizar receita
                </Button>
              </CardContent>
            </Card>)
          : <Loading /> }
      </Grid>
    </Grid>
  );
};

export default FoodInProgress;
