import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import Context from '../context/Context';

function Footer() {
  const history = useHistory();
  const { setInputValue, setSearchParams } = useContext(Context);

  return (
    <div data-testid="footer" className="footer">
      <button
        className="drink-icon"
        type="button"
        onClick={ () => {
          setInputValue('');
          setSearchParams('');
          history.push('/bebidas');
        } }
      >
        <img
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
          alt="icone drinks"
        />
      </button>
      <button
        className="explore-icon"
        type="button"
        onClick={ () => history.push('/explorar') }
      >
        <img
          src={ exploreIcon }
          data-testid="explore-bottom-btn"
          alt="icone explore"
        />
      </button>
      <button
        className="meal-icon"
        type="button"
        onClick={ () => {
          setInputValue('');
          setSearchParams('');
          history.push('/comidas');
        } }
      >
        <img
          src={ mealIcon }
          data-testid="food-bottom-btn"
          alt="icone food"
        />
      </button>
    </div>
  );
}

export default Footer;
