import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import recomendationThunk from '../redux/actions/recomendationAction';
import recomendationThunkDrinks from '../redux/actions/recomendationDrinks';

function Recomendation() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { recomendation } = useSelector((state) => state.recomendation);

  useEffect(() => {
    let fetchData = '';
    if (pathname.split('/')[1] === 'bebidas') {
      fetchData = () => dispatch(recomendationThunk(''));
    }
    if (pathname.split('/')[1] === 'comidas') {
      fetchData = () => dispatch(recomendationThunkDrinks(''));
    }
    fetchData('');
  }, []);

  return (
    <Carousel>
      {recomendation.map((element, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recomendation-card` }
          className="carousel-container"
        >
          {pathname.split('/')[1] === 'comidas'
            ? (
              <div className="recomendation-card">
                <img src={ element.strDrinkThumb } alt="drink" />
                <p data-testid={ `${index}-recomendation-title` }>{element.strDrink}</p>
              </div>
            ) : (
              <div className="recomendation-card">
                <img src={ element.strMealThumb } alt="meal" />
                <p data-testid={ `${index}-recomendation-title` }>{element.strMeal}</p>
              </div>
            )}
        </div>))}
    </Carousel>
  );
}

export default Recomendation;
