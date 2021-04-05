import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Profile from './pages/Profile';
import Meals from './pages/Meals';
import Cocktails from './pages/Cocktails';
import Explore from './pages/Explore';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';
import ExploreMealsByIngredient from './pages/ExploreMealsByIngredient';
import ExploreCocktailsByIngredient from './pages/ExploreCocktailsByIngredient';
import ExploreMealsByArea from './pages/ExploreMealsByArea';
import ExploreMeals from './pages/ExploreMeals';
import ExploreCocktails from './pages/ExploreCocktails';
import NotFound from './pages/NotFound';
import MealsDetails from './pages/MealsDetails';
import CocktailDetails from './pages/CocktailDetails';
import ProgressRecipe from './pages/ProgressRecipe';

export default function Routes() {
  return (
    <Switch>
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route path="/perfil" component={ Profile } />

      <Route
        path="/comidas/:id/in-progress"
        render={ (props) => <ProgressRecipe isMeal { ...props } /> }
      />
      <Route path="/comidas/:id" component={ MealsDetails } />
      <Route path="/comidas" component={ Meals } />

      <Route
        path="/bebidas/:id/in-progress"
        render={ (props) => <ProgressRecipe isMeal={ false } { ...props } /> }
      />
      <Route path="/bebidas/:id" component={ CocktailDetails } />
      <Route path="/bebidas" component={ Cocktails } />

      <Route path="/explorar/comidas/area" component={ ExploreMealsByArea } />
      <Route
        path="/explorar/comidas/ingredientes"
        component={ ExploreMealsByIngredient }
      />
      <Route path="/explorar/comidas" component={ ExploreMeals } />
      <Route path="/explorar/bebidas/area" component={ NotFound } />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ ExploreCocktailsByIngredient }
      />
      <Route path="/explorar/bebidas" component={ ExploreCocktails } />
      <Route path="/explorar" component={ Explore } />
      <Route exact path="/" component={ Login } />
      <Route path="/" component={ NotFound } />
    </Switch>
  );
}
