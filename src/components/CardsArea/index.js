import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Cards from '../Cards';
import Loading from '../Loading';

// import { Container } from './styles';
function CardsArea({ type }) {
  const { meals,
    isFetching: FetchingFoods, isFetchingAreas } = useSelector((state) => state.foods);
  const { drinks, isFetching: FetchingDrinks } = useSelector((state) => state.drinks);
  const TWELVE_CARDS = 12;
  if (FetchingFoods || FetchingDrinks || isFetchingAreas) return <Loading />;
  if (type === 'foods') {
    return (
      <Container
        className="d-flex flex-row flex-wrap align-items-center justify-content-center"
      >
        { !meals ? <p> nada por aqui! </p>
        && alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
          : meals.map(
            ({ strMeal, strMealThumb, idMeal }, index) => (
              index < TWELVE_CARDS && (
                <Cards
                  key={ strMeal }
                  name={ strMeal }
                  thumbSrc={ strMealThumb }
                  index={ index }
                  id={ idMeal }
                />)),
          )}
      </Container>
    );
  }
  if (type === 'drinks') {
    return (
      <Container
        className="d-flex flex-row flex-wrap align-items-center justify-content-center"
      >
        { !drinks ? <p> nada por aqui! </p>
        && alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
          : drinks.map(
            ({ strDrink, strDrinkThumb, idDrink }, index) => (
              index < TWELVE_CARDS && (
                <Cards
                  key={ strDrink }
                  name={ strDrink }
                  thumbSrc={ strDrinkThumb }
                  index={ index }
                  id={ idDrink }
                />)),
          )}
      </Container>
    );
  }
}

export default CardsArea;

CardsArea.propTypes = {
  type: PropTypes.string.isRequired,
};
