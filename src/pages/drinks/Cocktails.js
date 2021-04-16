import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { isNull } from 'lodash-es';
import Footer from '../../components/footer/Footer';
import Header from '../../components/Header';
import RecipesContext from '../../ContextApi/RecipesContext';
import CocktailCard from '../../components/cards/CocktailCard';
import DrinkCategoryButton from '../../components/DrinkCategoryButton';

function Cocktails() {
  const { cocktails, history } = useContext(RecipesContext);

  const cocktailsRecipes = cocktails.drinks;
  const cardMaximun = 12;

  const isNotUndefined = cocktailsRecipes !== undefined;
  const isNotNull = cocktailsRecipes !== null;

  if (isNotUndefined && isNotNull && cocktailsRecipes.length === 1) {
    history.push(`/bebidas/${cocktailsRecipes[0].idDrink}`);
  }
  if (isNull(cocktailsRecipes)) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
  return (
    <div>
      <Header title="Bebidas" search="" />
      <DrinkCategoryButton />
      { cocktailsRecipes
        && cocktailsRecipes.map((recipe, i) => (
          i < cardMaximun
           && (
             <Link to={ `bebidas/${recipe.idDrink}` }>
               <CocktailCard key={ i } order={ i } recipes={ recipe } />
             </Link>
           )
        ))}
      <Footer />
    </div>
  );
}

export default Cocktails;
