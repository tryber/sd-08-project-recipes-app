import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import { renderByDrinksOrigin, renderByMealsOrigin } from '../../redux/actions';
import './style.css';

function Footer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();

  const goToMealsPage = (e) => {
    e.preventDefault();
    dispatch(renderByMealsOrigin());
    if (path !== '/comidas') {
      history.push('/comidas');
    }
  };

  const goToDrinksPage = (e) => {
    e.preventDefault();
    dispatch(renderByDrinksOrigin());
    if (path !== '/bebidas') {
      history.push('/bebidas');
    }
  };

  return (
    <Container as="footer" className="footer bg-warning" data-testid="footer" fluid>
      <Navbar className="justify-content-around align-items-center">
        <input
          type="image"
          src={ drinkIcon }
          alt="Link para bebidas"
          data-testid="drinks-bottom-btn"
          width="40px"
          onClick={ goToDrinksPage }
        />
        <input
          type="image"
          src={ exploreIcon }
          alt="Link para exploração"
          data-testid="explore-bottom-btn"
          width="40px"
          onClick={ () => history.push('/explorar') }
        />
        <input
          type="image"
          src={ mealIcon }
          alt="Link para bebidas"
          data-testid="food-bottom-btn"
          width="40px"
          onClick={ goToMealsPage }
        />
      </Navbar>
    </Container>
  );
}

export default Footer;
