import React, { useEffect } from 'react';
import { Card, CardGroup, Carousel, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecommend } from '../../store/apiSlice';

const RECOMMENDATIONS = 6;

function DetailRecommend(props) {
  const { isFood: isParentFood } = props;
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.api.recommendLoading === 'pending');
  const recommendations = useSelector((state) => state.api.recommendData.meals
    || state.api.recommendData.drinks || []).slice(0, RECOMMENDATIONS);

  useEffect(() => {
    const database = isParentFood ? 'thecocktaildb' : 'themealdb';
    const endpoint = `https://www.${database}.com/api/json/v1/1/search.php?s=`;
    dispatch(fetchRecommend(endpoint));
  }, [isParentFood, dispatch]);

  if (isLoading) return <Spinner data-testid="status" animation="border" />;

  function cardGen(item, index) {
    return (
      <Card data-testid={ `${index}-recomendation-card` }>
        <Card.Img
          variant="top"
          src={ item && (item.strMealThumb || item.strDrinkThumb) }
          alt="recomendação"
        />
        <Card.Body>
          <Card.Text>{ item && (item.strAlcoholic || item.strCategory) }</Card.Text>
          <Card.Title data-testid={ `${index}-recomendation-title` }>
            { item && (item.strMeal || item.strDrink) }
          </Card.Title>
        </Card.Body>
      </Card>
    );
  }

  const cards = recommendations.map((item, index) => cardGen(item, index));

  return (
    <section>
      <h1>Recomendadas</h1>
      <Carousel>
        <Carousel.Item>
          <CardGroup>
            { cards[0] }
            { cards[1] }
          </CardGroup>
        </Carousel.Item>
        <Carousel.Item>
          <CardGroup>
            { cards[2] }
            { cards[3] }
          </CardGroup>
        </Carousel.Item>
        <Carousel.Item>
          <CardGroup>
            { cards[4] }
            { cards[5] }
          </CardGroup>
        </Carousel.Item>
      </Carousel>
    </section>
  );
}

DetailRecommend.propTypes = {
  isFood: PropTypes.bool.isRequired,
};

export default DetailRecommend;
