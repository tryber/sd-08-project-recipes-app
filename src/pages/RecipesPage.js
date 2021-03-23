import React from 'react';
import { useHistory } from 'react-router';
import useFetchDrinkRecipes from '../hooks/useFetchDrinkRecipes';
import useFetchMealRecipes from '../hooks/useFetchMealRecipes';

function RecipesPage() {
  const history = useHistory();
  const { pathname } = history.location;
  const [recipesDrink, randomDrinks, drinkBySearch] = useFetchDrinkRecipes();
  const [recipesMeal, randomMeal, mealBySearch] = useFetchMealRecipes();

  function generateRecipesList(list, type) {
    const idType = `id${type}`;
    const strType = `str${type}`;
    const strTypeThumb = `str${type}Thumb`;
    // if (from === 'search' && !list[1]) {
    //   return <Redirect push to={ `${pathname}/${list[0][idType]}` } />;
    // }
    console.log(list[0]);
    return (
      <div>
        { list.map((elem) => (
          <div key={ elem[idType] }>
            <h4>{ elem[strType] }</h4>
            <span>{ elem[idType] }</span>
            <img
              src={ elem[strTypeThumb] }
              alt={ elem[strType] }
            />
          </div>
        ))}
      </div>
    );
  }

  if (!mealBySearch && !drinkBySearch) {
    let recipe;
    let type;
    if (pathname === '/comidas') { recipe = randomMeal; type = 'Meal'; }
    if (pathname === '/bebidas') { recipe = randomDrinks; type = 'Drink'; }
    return (
      <div>
        <h2>Random suggestion</h2>
        { generateRecipesList(recipe, type) }
      </div>
    );
  }
  let searchRecipes;
  let searchType;
  if (pathname === '/comidas') { searchRecipes = recipesMeal; searchType = 'Meal'; }
  if (pathname === '/bebidas') { searchRecipes = recipesDrink; searchType = 'Drink'; }

  return generateRecipesList(searchRecipes, searchType);
}

export default RecipesPage;
