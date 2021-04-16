import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/Header';
import RecipesContext from '../../ContextApi/RecipesContext';
import FoodCard from '../../components/FoodCard';

const cardMaximun = 12;

export default function ExploreArea() {
  const { listArea, recipes, setSearchParam } = useContext(RecipesContext);
  const recipeMeals = recipes.meals;

  function handleOnChange({ target: { value } }) {
    if (value !== '') {
      setSearchParam({
        selectedParam: 'option',
        inputSearch: value,
      });
    } else {
      setSearchParam({
        selectedParam: 'option-All',
        inputSearch: value,
      });
    }
  }

  return (
    <div>
      <Header title="Explorar Origem" search="true" />
      <select
        data-testid="explore-by-area-dropdown"
        name="explore-by-area"
        onChange={ handleOnChange }
      >
        <option
          value=""
          data-testid="All-option"
        >
          All
        </option>
        {
          listArea.map((option, index) => (
            <option
              key={ index }
              value={ option.strArea }
              data-testid={ `${option.strArea}-option` }
            >
              { option.strArea }
            </option>
          ))
        }
      </select>
      { recipeMeals
        && recipeMeals.map((recipe, i) => (
          i < cardMaximun
             && (
               <Link to={ `/comidas/${recipe.idMeal}` }>
                 <FoodCard key={ i } order={ i } recipes={ recipe } />
               </Link>
             )
        ))}
      <Footer />
    </div>
  );
}
