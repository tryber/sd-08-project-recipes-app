import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Cards from '../Card/Cards';

const List = ({ title, results, numberOfCards }) => {
  console.log(results);
  return (
    <>
      {results.map((object, index) => {
        if (index < numberOfCards) {
          return (
            <Link
              to={
                title === 'Comidas'
                  ? `/comidas/${object.idMeal}`
                  : `/bebidas/${object.idDrink}`
              }
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
List.defaultProps = {
  numberOfCards: 12,
};
List.propTypes = {
  title: PropTypes.string.isRequired,
  results: PropTypes.arrayOf.isRequired,
  numberOfCards: PropTypes.number,
};

export default List;
