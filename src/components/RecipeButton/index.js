import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { getlocalStorage } from '../../services/localStorage';
import './styles.css';

function RecipeButton() {
  const { id: idPage } = useParams();
  const { path } = useRouteMatch();
  const history = useHistory();
  const [useRecipeInProgress, setUseRecipeInProgress] = useState(false);
  useEffect(() => {
    const verifyDoneStorage = () => {
      if (path.includes('/comidas')) {
        const inProgressRecipes = getlocalStorage('inProgressRecipes');
        const meals = inProgressRecipes && inProgressRecipes.meals;
        const inProgress = meals && Object.keys(meals).some(
          (idMeal) => idMeal === idPage,
        );
        setUseRecipeInProgress(inProgress);
      } else {
        const inProgressRecipes = getlocalStorage('inProgressRecipes');
        const drinks = inProgressRecipes && inProgressRecipes.cocktails;
        const inProgress = drinks && Object.keys(drinks).some(
          (idDrink) => idDrink === idPage,
        );
        setUseRecipeInProgress(inProgress);
      }
    };
    verifyDoneStorage();
  }, [idPage, path]);

  const goToProgressPage = () => {
    if (path.includes('/comidas')) {
      history.push(`/comidas/${idPage}/in-progress`);
    } else {
      history.push(`/bebidas/${idPage}/in-progress`);
    }
  };

  return (
    <Button
      data-testid="start-recipe-btn"
      variant="success"
      className="recipe-button"
      size="lg"
      onClick={ goToProgressPage }
    >
      {
        useRecipeInProgress ? 'Continuar Receita' : 'Iniciar Receita'
      }
    </Button>
  );
}

export default RecipeButton;
