import React from 'react';
import { Route, Switch } from 'react-router-dom';

import RecipesFood from './pages/foods/RecipesFood';
import Login from './pages/Login';
import Cocktails from './pages/drinks/Cocktails';
import FoodDetails from './pages/foods/FoodDetails';
import FoodInProgress from './pages/foods/FoodInProgress';
import CocktailDetails from './pages/drinks/CocktailDetails';
import CocktailsInProgress from './pages/drinks/CocktailInProgress';
import Explorer from './pages/explorer/Explorer';
import ExploreFood from './pages/explorer/ExploreFood';
import ExplorerCocktails from './pages/explorer/ExplorerCocktails';
import ExplorerFoodIngredients from './pages/explorer/ExplorerFoodIngredients';
import ExplorerCocktailIngredients from './pages/explorer/ExplorerCocktailIngredients';
import ExploreArea from './pages/explorer/ExploreArea';
import Profile from './pages/user/Profile';
import DoneRecipes from './pages/user/DoneRecipes';
import FavoriteRecipes from './pages/user/FavoriteRecipes';
import NotFound from './pages/NotFound';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ RecipesFood } />
      <Route exact path="/bebidas" component={ Cocktails } />
      <Route exact path="/comidas/:id" component={ FoodDetails } />
      <Route exact path="/bebidas/:id" component={ CocktailDetails } />
      <Route path="/comidas/:id/in-progress" componente={ FoodInProgress } />
      <Route path="/bebidas/:id/in-progress" componente={ CocktailsInProgress } />
      <Route exact path="/explorar" component={ Explorer } />
      <Route exact path="/explorar/comidas" component={ ExploreFood } />
      <Route exact path="/explorar/bebidas" component={ ExplorerCocktails } />
      <Route
        path="/explorar/comidas/ingredientes"
        component={ ExplorerFoodIngredients }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ ExplorerCocktailIngredients }
      />
      <Route path="/explorar/comidas/area" component={ ExploreArea } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route path="/**" component={ NotFound } />
    </Switch>
  );
}
