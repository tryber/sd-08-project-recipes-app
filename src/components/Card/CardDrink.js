import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DrinkContext from '../../context/bebidaContext/DrinkContext';
import '../../App.css';

function CardDrink() {
  const {
    values: {
      drinks,
      filteredDrinks,
    },
  } = useContext(DrinkContext);

  const maxCards = 12;
  const data = (filteredDrinks.length === 0) ? drinks : filteredDrinks;

  if (drinks === undefined) return '';

  return (
    <section className="recipe-card-container">
      {data.map(({ strDrink, strDrinkThumb, idDrink }, index) => {
        if (index >= maxCards) return '';
        return (
          <Link
            src={ strDrinkThumb }
            to={ `/bebidas/${idDrink}` }
            key={ strDrink }
            data-testid={ `${index}-recipe-card` }
            className="recipe-card"
          >
            <img
              src={ strDrinkThumb }
              alt={ strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{strDrink}</p>
          </Link>
        );
      })}
    </section>
  );
}

export default CardDrink;
