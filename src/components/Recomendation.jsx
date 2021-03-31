import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import recomendationThunkMeals from '../redux/actions/recomendationAction';
import recomendationThunkDrinks from '../redux/actions/recomendationDrinks';

function Recomendation() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const arrayRecipes = pathname.split('/')[1];

  const recomendation = useSelector((state) => state.recomendation.recomendation);

  useEffect(() => {
    let fetchData = '';
    if (arrayRecipes === 'bebidas') {
      fetchData = () => dispatch(recomendationThunkMeals(''));
    }
    if (arrayRecipes === 'comidas') {
      fetchData = () => dispatch(recomendationThunkDrinks(''));
    }
    fetchData('');
  }, []);

  return (
    <Carousel>
      {recomendation.map((element, index) => (
        <div key={ index } data-testid={ `${index}-recomendation-card` }>
          {arrayRecipes === 'comidas'
            ? (
              <div>
                <img src={ element.strDrinkThumb } alt="drink" />
                <p data-testid={ `${index}-recomendation-title` }>{element.strDrink}</p>
              </div>
            ) : (
              <div>
                <img src={ element.strMealThumb } alt="drink" />
                <p data-testid={ `${index}-recomendation-title` }>{element.strMeal}</p>
              </div>
            )}
        </div>))}
    </Carousel>
  );
}

export default Recomendation;
