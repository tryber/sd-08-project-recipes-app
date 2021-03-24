import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import RecipesContext from '../../context/RecipesContext';

import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import MealCard from '../../components/MealCard';
import CategoryBar from '../../components/CategoryBar';
import { LIMIT_OF_CARDS } from '../../common/defs';

export default function Meals() {
  const { meals, isShow, setMeal } = useContext(RecipesContext);

  return (
    <div>
      <Header title="Comidas" />
      {isShow && <SearchBar type="meals" />}
      <CategoryBar type="meals" />
      {meals.map((meal, index) => {
        if (meals.length === 1 && !meals[0].idMeal === '52968') {
          return <Redirect to={ `/comidas/${meals[0].idMeal}` } />;
        }
        if (index < LIMIT_OF_CARDS) {
          return (
            <MealCard onClick={ () => setMeal(meal) } index={ index } key={ index } meal={ meal } />
          );
        }
        return null;
      })}
    </div>
  );
}

// Meals.propTypes = ({ history: PropTypes.objectOf(PropTypes.string).isRequired });
