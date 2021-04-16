import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { RANDOM_RECIPE } from '../redux/actions';
import { clearRandom, fetchRandomDrinkAction,
  fetchRandomMealAction } from '../redux/actions/randomRecipes';
import '../CSS/Explore.css';

function ExploreFoodDrink() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { random } = useSelector((state) => state.recipes);
  const { singleRecipe } = useSelector((state) => state.recipes);
  const { pathname } = history.location;

  const randomClick = () => {
    dispatch({ type: RANDOM_RECIPE });
  };

  useEffect(() => {
    let dispatchRecipes;
    if (pathname.split('/')[2] === 'comidas' && singleRecipe.length === 0 && random) {
      dispatchRecipes = () => dispatch(fetchRandomMealAction());
      dispatchRecipes();
    }
    if (pathname.split('/')[2] === 'bebidas' && singleRecipe.length === 0 && random) {
      dispatchRecipes = () => dispatch(fetchRandomDrinkAction());
      dispatchRecipes();
    }
    if (singleRecipe.length === 1 && pathname.split('/')[2] === 'comidas' && random) {
      history.push(`/${pathname.split('/')[2]}/${singleRecipe[0].idMeal}`);
    }
    if (singleRecipe.length === 1 && pathname.split('/')[2] === 'bebidas' && random) {
      history.push(`/${pathname.split('/')[2]}/${singleRecipe[0].idDrink}`);
    }
  }, [random, singleRecipe]);

  useEffect(() => () => dispatch(clearRandom()), []);

  return (
    <section className="Explore-main-container">
      <Header />
      <div className="explore-btn-container">
        { pathname === '/explorar/comidas' && <Button /> }
        <button
          onClick={ () => history
            .push(`/explorar/${pathname.split('/')[2]}/ingredientes`) }
          data-testid="explore-by-ingredient"
          type="button"
          className="explore-btn regular-button"
        >
          Por Ingredientes

        </button>
        <button
          onClick={ randomClick }
          data-testid="explore-surprise"
          type="button"
          className="explore-btn regular-button"
        >
          Me Surpreenda!

        </button>
      </div>
      <Footer />
    </section>
  );
}

export default ExploreFoodDrink;
