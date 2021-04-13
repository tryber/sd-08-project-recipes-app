import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { fetchRecomendationsCard } from '../services';

const RecomandationCard = ({ type }) => {
  const [typeDrinkFood, setType] = useState([]);
  const isMeal = type === 'comidas';

  useEffect(() => {
    const Fetch = async () => {
      const drinkOrFood = await fetchRecomendationsCard(type);
      setType(drinkOrFood);
    };
    Fetch();
  }, [type]);

  return (

    <Carousel className="Carousel">

      {typeDrinkFood.reduce((acc, _, index, array) => {
        if (index % 2 === 0) {
          acc.push(array.slice(index, index + 2));
        } return acc;
      }, []).map(([item1, item2], index) => (
        <Carousel.Item key={ isMeal ? item1.idDrink : item1.idMeal }>
          <div
            data-testid={ `${index * 2}-recomendation-card` }

          >
            <img
              className="d-block w-50"
              src={ isMeal ? item1.strDrinkThumb : item1.strMealThumb }
              alt={ item1.strCategory }
            />
            <h3 data-testid={ `${index * 2}-recomendation-title` }>
              {isMeal ? item1.strDrink : item1.strMeal}

            </h3>
          </div>

          <div
            data-testid={ `${(index * 2) + 1}-recomendation-card` }

          >
            <img
              className="d-block w-50"
              src={ isMeal ? item2.strDrinkThumb : item2.strMealThumb }
              alt={ item2.strCategory }
            />
            <h3 data-testid={ `${(index * 2) + 1}-recomendation-title` }>
              {isMeal ? item2.strDrink : item2.strMeal}

            </h3>

          </div>
        </Carousel.Item>

      ))}
    </Carousel>

  );
};
export default RecomandationCard;

RecomandationCard.propTypes = {
  type: PropTypes.elementType.isRequired,
};
