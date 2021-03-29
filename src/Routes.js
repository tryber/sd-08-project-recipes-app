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

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ RecipesFood } />
      <Route path="/bebidas" component={ Cocktails } />
      <Route path="/comidas/:id" component={ FoodDetails } />
      <Route path="/bebidas/:id" component={ CocktailDetails } />
      <Route path="/comidas/:id/in-progress" componente={ FoodInProgress } />
      <Route path="/bebidas/:id/in-progress" componente={ CocktailsInProgress } />
      <Route path="/explorar" component={ Explorer } />
      <Route path="/explorar/comidas" component={ ExploreFood } />
      <Route path="/explorar/bebidas" component={ ExplorerCocktails } />
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
    </Switch>
  );
}
