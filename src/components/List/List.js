import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Cards from '../Card/Cards';

const List = ({ title, results }) => {
  const CARDSFORPAGE = 12;
  return (
    <>
      {results.map((object, index) => {
        if (index < CARDSFORPAGE) {
          return (
            <Link
              to={ title === 'Comidas'
                ? `/comidas/${object.idMeal}`
                : `/bebidas/${object.idDrink}` }
            >
              <Cards
                key={ title === 'Comidas' ? object.idMeal : object.idDrink }
                object={ object }
                title={ title }
                index={ index }
              />
            </Link>
          );
        }
        return true;
      })}
    </>
  );
};
List.propTypes = {
  title: PropTypes.string.isRequired,
  results: PropTypes.arrayOf.isRequired,
};

export default List;
