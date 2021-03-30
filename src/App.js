import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Explorer from './pages/Explorer';
import Meals from './pages/Meals';
import MealRecipeDetails from './pages/MealRecipeDetails';
import CocktailRecipeDetails from './pages/CocktailRecipeDetails';
import MealsExplorer from './pages/MealsExplorer';
import DrinksExplorer from './pages/DrinksExplorer';
import MealsIngredients from './pages/MealsIngredients';
import CocktailsIngredients from './pages/CocktailsIngredients';
import MealsOrigin from './pages/MealsOrigin';
import Cocktails from './pages/Cocktails';
import RecipesDone from './pages/RecipesDone';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  const notFount = () => <div>Not Found</div>;
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ RecipesDone } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route exact path="/explorar" component={ Explorer } />
      <Route exact path="/comidas" component={ Meals } />
      <Route exact path="/bebidas" component={ Cocktails } />
      <Route exact path="/comidas/:id" component={ MealRecipeDetails } />
      <Route exact path="/bebidas/:id" component={ CocktailRecipeDetails } />
      <Route exact path="/explorar/comidas" component={ MealsExplorer } />
      <Route exact path="/explorar/bebidas" component={ DrinksExplorer } />
      <Route exact path="/explorar/comidas/ingredientes" component={ MealsIngredients } />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ CocktailsIngredients }
      />
      <Route exact path="/explorar/comidas/area" component={ MealsOrigin } />
      <Route exact path="/explorar/bebidas/area" component={ () => notFount() } />
    </Switch>
  );
}

export default App;
