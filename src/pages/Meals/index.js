import React, { useContext } from 'react';
import { Redirect } from 'react-router';

import RecipesContext from '../../context/RecipesContext';

import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import MealCard from '../../components/MealCard';
import CategoryBar from '../../components/CategoryBar';
import { LIMIT_OF_CARDS } from '../../common/defs';
import Footer from '../../components/Footer';

export default function Meals() {
  const { meals, isShow } = useContext(RecipesContext);

  return (
    <div className="meals-page">
      <Header title="Comidas" />
      {isShow && <SearchBar type="meals" />}
      <CategoryBar type="meals" />
      {meals.map((meal, index) => {
        if (meals.length === 1 && !meals[0].idMeal) {
          return <Redirect to={ `/comidas/${meals[0].idMeal}` } />;
        }
        if (index < LIMIT_OF_CARDS) {
          return (
            <MealCard index={ index } key={ index } meal={ meal } />
          );
        }
        return null;
      })}
      <Footer />
    </div>
  );
}
