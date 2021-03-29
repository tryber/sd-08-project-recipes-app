import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import DetailsMeal from './pages/DetailsMeal';
import DetailsDrink from './pages/DetailsDrink';
import Drinks from './pages/Drinks';
import Food from './pages/Food';
import Profile from './pages/Profile';
import ToExplore from './pages/ToExplore';
import ToExploreFood from './pages/ToExploreFood';
import ToExploreDrinks from './pages/ToExploreDrinks';
import EatenByIngredients from './pages/EatenByIngredients';
import DrinksByIngredients from './pages/DrinksByIngredients';
import FoodsByOriginLocation from './pages/FoodsByOriginLocation';
import RecipesDone from './pages/RecipesDone';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeInProgress from './pages/RecipeInProgress';
import MealDrinkProgress from './components/MealDrinkProgress';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/comidas" component={ Food } />
      <Route exact path="/comidas/:id" component={ DetailsMeal } />
      <Route exact path="/bebidas/:id" component={ DetailsDrink } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/explorar" component={ ToExplore } />
      <Route exact path="/explorar/comidas" component={ ToExploreFood } />
      <Route exact path="/explorar/bebidas" component={ ToExploreDrinks } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ EatenByIngredients }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ DrinksByIngredients }
      />
      <Route
        exact
        path="/explorar/comidas/area"
        component={ FoodsByOriginLocation }
      />
      <Route
        exact
        path="/explorar/bebidas/area"
        component={ NotFound }
      />
      <Route exact path="/receitas-feitas" component={ RecipesDone } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <RecipeInProgress
        exact
        path="/comidas/:id/in-progress"
        type="meal"
        component={ MealDrinkProgress }
      />
      <RecipeInProgress
        exact
        path="/bebidas/:id/in-progress"
        type="drink"
        component={ MealDrinkProgress }
      />
    </Switch>
  );
}

export default App;
