import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import { FoodDetails, FoodInProgress, Foods } from '../pages/Foods';
import { Profile, FavRecipes, DoneRecipes } from '../pages/Profile';
import { DrinkDetails, DrinkInProgress, Drinks } from '../pages/Drinks';
import {
  Explorer,
  ExplorerDrink,
  ExplorerDrinksIngredients,
  ExplorerFood,
  ExplorerFoodsIngredients,
  ExplorerFoodsRegion,
} from '../pages/Explorer';

function routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/comidas" exact component={ Foods } />
        <Route path="/bebidas" exact component={ Drinks } />
        <Route path="/comidas/:id" exact component={ FoodDetails } />
        <Route path="/bebidas/:id" exact component={ DrinkDetails } />
        <Route path="/comidas/:id/in-progress" component={ FoodInProgress } />
        <Route path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
        <Route path="/explorar" exact component={ Explorer } />
        <Route path="/explorar/comidas" exact component={ ExplorerFood } />
        <Route path="/explorar/bebidas" exact component={ ExplorerDrink } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExplorerFoodsIngredients }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExplorerDrinksIngredients }
        />
        <Route path="/explorar/comidas/area" component={ ExplorerFoodsRegion } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/receitas-feitas" component={ DoneRecipes } />
        <Route path="/receitas-favoritas" component={ FavRecipes } />
        <Route path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}

export default routes;
