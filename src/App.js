import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Cocktails from './pages/Cocktails';
import CocktailsExplorer from './pages/CocktailsExplorer';
import CocktailsIngredients from './pages/CocktailsIngredients';
import CocktailRecipeDetails from './pages/CocktailRecipeDetails';
import CocktailRecipeInProgress from './pages/CocktailRecipeInProgress';
import Explorer from './pages/Explorer';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Meals from './pages/Meals';
import MealsExplorer from './pages/MealsExplorer';
import MealsIngredients from './pages/MealsIngredients';
import MealsOrigin from './pages/MealsOrigin';
import MealRecipeDetails from './pages/MealRecipeDetails';
import MealRecipeInProgress from './pages/MealRecipeInProgress';
import Profile from './pages/Profile';
import RecipesDone from './pages/RecipesDone';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" render={ (props) => <Meals { ...props } /> } />
      <Route exact path="/bebidas" render={ (props) => <Cocktails { ...props } /> } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/explorar" component={ Explorer } />
      <Route exact path="/receitas-feitas" component={ RecipesDone } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route
        exact
        path="/comidas/:id"
        render={ (props) => <MealRecipeDetails { ...props } /> }
      />
      <Route
        exact
        path="/bebidas/:id/"
        render={ (props) => <CocktailRecipeDetails { ...props } /> }
      />
      <Route
        exact
        path="/comidas/:id/in-progress"
        render={ (props) => <MealRecipeInProgress { ...props } /> }
      />
      <Route
        exact
        path="/bebidas/:id/in-progress"
        render={ (props) => <CocktailRecipeInProgress { ...props } /> }
      />
      <Route exact path="/explorar/comidas" component={ MealsExplorer } />
      <Route exact path="/explorar/bebidas" component={ CocktailsExplorer } />
      <Route exact path="/explorar/comidas/ingredientes" component={ MealsIngredients } />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ CocktailsIngredients }
      />
      <Route exact path="/explorar/comidas/area" component={ MealsOrigin } />

      {/* <Route exact path="/explorar/bebidas/area" component={ () => notFount() } /> */}
    </Switch>
  );
}

export default App;
