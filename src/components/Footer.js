import React, { useContext } from 'react';
import { Button, Navbar, NavLink } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  const { setHeaderInfo, setBarraBuscar } = useContext(ContextRecipes);

  function handleClickDrinkBtn() {
    setHeaderInfo({ pageTitle: 'Bebidas', showSearchIcon: true });
    setBarraBuscar({ input: '', radio: '' });
    return history.push('/bebidas');
  }

  function handleClickExploreBtn() {
    setHeaderInfo({ pageTitle: 'Explorar', showSearchIcon: false });
    return history.push('/explorar');
  }

  function handleClickMeatBtn() {
    setHeaderInfo({ pageTitle: 'Comidas', showSearchIcon: true });
    setBarraBuscar({ input: '', radio: '' });
    return history.push('/comidas');
  }

  return (
    <section className="w-100 footer" data-testid="footer">
      <Navbar
        className="d-flex bg-warning justify-content-between align-items-center w-100"
      >
        <NavLink
          data-testid="drinks-bottom-btn"
          onClick={ handleClickDrinkBtn }
          src={ drinkIcon }
        >
          <img src={ drinkIcon } alt="drink-icon" />
        </NavLink>

        <Button
          className="buttom"
          variant="warning"
          type="button"
          data-testid="explore-bottom-btn"
          onClick={ handleClickExploreBtn }
          src={ exploreIcon }
        >
          <img src={ exploreIcon } alt="explore-icon" />
        </Button>

        <NavLink
          data-testid="food-bottom-btn"
          onClick={ handleClickMeatBtn }
          src={ mealIcon }
        >
          <img src={ mealIcon } alt="food icon" />
        </NavLink>
      </Navbar>
    </section>
  );
}

export default Footer;
