import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import getMeal from '../../services/requestMealForId';
import getDrink from '../../services/RequestDrinkForId';
import CardDetails from '../../components/CardDetail/CardDetail';
import CheckBoxIngredients from '../../components/CheckBoxIngredients/CheckBoxIngredients';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import Context from '../../contextApi/Context';

const RecipesInProgress = ({ title, match }) => {
  const { checkbox } = useContext(Context);
  const history = useHistory();
  const {
    params: { id },
  } = match;

  const [object, setObject] = useState({});
  const [isLoading, setLoad] = useState(false);

  const getMealOrDrink = async () => {
    if (title === 'Comidas') {
      const meal = await getMeal(id);
      // console.log(meal);
      return meal;
    }
    const drink = await getDrink(id);
    // console.log(drink);
    return drink;
  };

  useEffect(() => {
    (async () => {
      setLoad(true);
      const mealOrDrink = await getMealOrDrink();
      setObject(mealOrDrink);
      setLoad(false);
    })();
    if (localStorage.getItem('doneRecipes') === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
  }, []);

  const finishRecipe = () => {
    const doneRecipesObject = {
      id: title === 'Comidas' ? object.idMeal : object.idDrink,
      type: title === 'Comidas' ? 'comida' : 'bebida',
      area: object.strArea,
      category: object.strCategory,
      alcoholicOrNot: title === 'Comidas' ? '' : 'Alcoholic',
      name: title === 'Comidas' ? object.strMeal : object.strDrink,
      image: title === 'Comidas' ? object.strMealThumb : object.strDrinkThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: object.strTags !== null ? object.strTags.split(',') : '',
    };
    const localRecipes = [
      ...JSON.parse(localStorage.getItem('doneRecipes')),
      doneRecipesObject,
    ];
    localStorage.setItem('doneRecipes', JSON.stringify(localRecipes));
    history.push('/receitas-feitas');
  };

  return (
    <>
      <CardDetails title={title} object={object} isLoading={isLoading}>
        <CheckBoxIngredients object={object} title={title} />
      </CardDetails>
      <Button
        className="btn btn-primary w-100"
        data-testid="finish-recipe-btn"
        disabled={checkbox ? false : true}
        onClick={() => finishRecipe()}
      >
        Finalizar Receita
      </Button>
    </>
  );
};

RecipesInProgress.propTypes = {
  title: PropTypes.string.isRequired,
  object: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default RecipesInProgress;
