import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Explore from './pages/Explore';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import ExploreFood from './pages/ExploreFood';
import DrinksExplore from './pages/DrinksExplore';
import ExploreFoodByLocalOrigin from './pages/ExploreFoodByLocalOrigin';
import ProfilePage from './pages/ProfilePage';
import ReadyMadeRecipes from './pages/ReadyMadeRecipes';
import FavoritesRecipes from './pages/FavoritesRecipes';
import ExploreFoodsByIngredients from './pages/ExploreFoodsByIngredients';
import ExploreDrinksByIngredients from './pages/ExploreDrinksByIngredients';
import FoodProcess from './pages/FoodProcess';
import DrinkProcess from './pages/DrinkProcess';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import NotFound from './components/NotFound';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/comidas" component={ Foods } />
    <Route exact path="/bebidas" component={ Drinks } />
    <Route exact path="/comidas/:id" component={ FoodDetails } />
    <Route exact path="/bebidas/:id" component={ DrinkDetails } />
    <Route exact path="/comidas/:id/in-progress" component={ FoodProcess } />
    <Route exact path="/bebidas/:id/in-progress" component={ DrinkProcess } />
    <Route exact path="/explorar" component={ Explore } />
    <Route exact path="/explorar/comidas" component={ ExploreFood } />
    <Route exact path="/explorar/bebidas" component={ DrinksExplore } />
    <Route
      exact
      path="/explorar/comidas/ingredientes"
      component={ ExploreFoodsByIngredients }
    />
    <Route
      exact
      path="/explorar/bebidas/ingredientes"
      component={ ExploreDrinksByIngredients }
    />
    <Route exact path="/explorar/comidas/area" component={ ExploreFoodByLocalOrigin } />
    <Route exact path="/perfil" component={ ProfilePage } />
    <Route exact path="/receitas-feitas" component={ ReadyMadeRecipes } />
    <Route exact path="/receitas-favoritas" component={ FavoritesRecipes } />
    <Route exact path="*" component={ NotFound } />
  </Switch>
);

export default Routes;
