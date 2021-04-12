import React from 'react';
import { Route, Switch } from 'react-router-dom';
import containers from './containers/index';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ containers.Login } />
    <Route exact path="/comidas" component={ containers.MainFood } />
    <Route exact path="/comidas/:id" component={ containers.FoodDetails } />
    <Route
      exact
      path="/comidas/:id/in-progress"
      component={ containers.FoodDetailsInProgress }
    />
    <Route
      exact
      path="/bebidas"
      component={ containers.Drinks }
    />
    <Route exact path="/bebidas/:id" component={ containers.DrinkDetails } />
    <Route
      exact
      path="/bebidas/:id/in-progress"
      component={ containers.DrinkDetainsInProgress }
    />
    <Route exact path="/explorar" component={ containers.Explore } />
    <Route exact path="/perfil" component={ containers.Profile } />
    <Route exact path="/receitas-feitas" component={ containers.DoneRecipes } />
    <Route exact path="/receitas-favoritas" component={ containers.FavoriteRecipes } />
    <Route exact path="/explorar/comidas" component={ containers.ExploreFoods } />
    <Route exact path="/explorar/bebidas" component={ containers.ExploreDrinks } />
    <Route
      exact
      path="/explorar/comidas/ingredientes"
      component={ containers.ExploreFoodsByIngredients }
    />
    <Route
      exact
      path="/explorar/bebidas/ingredientes"
      component={ containers.ExploreDrinksByIngredients }
    />
    <Route
      exact
      path="/explorar/bebidas/area"
      component={ containers.NotFound }
    />
    <Route
      exact
      path="/explorar/comidas/area"
      component={ containers.ExploreOrigination }
    />
  </Switch>
);

export default Routes;
