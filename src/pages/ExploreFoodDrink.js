import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { RANDOM_RECIPE } from '../redux/actions';
import { clearRandom, fetchRandomDrinkAction,
  fetchRandomMealAction } from '../redux/actions/randomRecipes';

function ExploreFoodDrink() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { random } = useSelector((state) => state.recipes);
  const { singleRecipe } = useSelector((state) => state.recipes);
  const { pathname } = history.location;
  const foodDrinks = history.location.pathname.split('/');

  const randomClick = () => {
    dispatch({ type: RANDOM_RECIPE });
  };

  useEffect(() => {
    const dispatchMeal = () => dispatch(fetchRandomMealAction());
    const dispatchDrink = () => dispatch(fetchRandomDrinkAction());
    if (foodDrinks[2] === 'comidas' && singleRecipe.length === 0 && random) {
      dispatchMeal();
    }
    if (foodDrinks[2] === 'bebidas' && singleRecipe.length === 0 && random) {
      dispatchDrink();
    }
    if (singleRecipe.length === 1 && foodDrinks[2] === 'comidas' && random) {
      history.push(`/${foodDrinks[2]}/${singleRecipe[0].idMeal}`);
    }
    if (singleRecipe.length === 1 && foodDrinks[2] === 'bebidas' && random) {
      history.push(`/${foodDrinks[2]}/${singleRecipe[0].idDrink}`);
    }
  }, [random, singleRecipe]);

  useEffect(() => () => dispatch(clearRandom()), []);

  return (
    <main>
      <Header />
      { pathname === '/explorar/comidas' && <Button /> }
      <button
        onClick={ () => history.push(`/explorar/${foodDrinks[2]}/ingredientes`) }
        data-testid="explore-by-ingredient"
        type="button"
      >
        Por Ingredientes

      </button>
      <button
        onClick={ randomClick }
        data-testid="explore-surprise"
        type="button"
      >
        Me Surpreenda!

      </button>
      <Footer />
    </main>
  );
}

export default ExploreFoodDrink;
