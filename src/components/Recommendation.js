import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

const Recommendation = () => {
  const MAX_ITEMS_CAROUSEL = 6;
  const location = useLocation();
  const pathname = location.pathname.split('/')[1];

  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchCarousel = async () => {
      if (pathname === 'bebidas') {
        const req = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const { meals } = await req.json();
        const finalResult = meals.filter((_, index) => index < MAX_ITEMS_CAROUSEL);
        return setResult(finalResult);
      }
      const req = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const { drinks } = await req.json();
      const finalResult = drinks.filter((_, index) => index < MAX_ITEMS_CAROUSEL);
      return setResult(finalResult);
    };
    fetchCarousel();
  }, []);

  return (
    <Carousel indicators={ false } className="carousel-container">
      {result.length > 0 && result.map((item, index) => {
        if (pathname === 'bebidas') {
          return (
            <Carousel.Item
              data-testid={ `${index}-recomendation-card` }
              key={ index }
            >
              <img src={ item.strMealThumb } alt="drink" />
              <Carousel.Caption className="carousel-caption">
                <h3 data-testid={ `${index}-recomendation-title` }>{item.strMeal}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          );
        }
        if (pathname === 'comidas') {
          return (
            <Carousel.Item
              data-testid={ `${index}-recomendation-card` }
              key={ index }
            >
              <img src={ item.strDrinkThumb } alt="drink" />
              <Carousel.Caption className="carousel-caption">
                <h3 data-testid={ `${index}-recomendation-title` }>{item.strDrink}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          );
        }
        return null;
      })}
    </Carousel>
  );
};

export default Recommendation;
