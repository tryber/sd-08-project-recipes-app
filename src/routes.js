import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Explorer from './pages/Explorer/Explorer';
import ExplorerByArea from './pages/ExplorerByArea/ExplorerByArea';
import ExplorerByIngridients from './pages/ExplorerByIngridients/ExplorerByIngridients';
import ExplorerFoodsDrinks from './pages/ExplorerFoodsDrinks/ExplorerFoodsDrinks';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import RecipesFavDone from './pages/RecipesFavDone/RecipesFavDone';
import Details from './pages/Details/Details';
import RecipesInProgress from './pages/RecipesInProgress/RecipesInProgress';

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Login />
    </Route>
    <Route exact path="/comidas">
      <Home title="Comidas" />
    </Route>
    <Route exact path="/bebidas">
      <Home title="Bebidas" />
    </Route>
    <Route exact path="/explorar">
      <Explorer title="Explorar" visible={ false } />
    </Route>
    <Route exact path="/explorar/comidas">
      <ExplorerFoodsDrinks title="Explorar Comidas" visible={ false } />
    </Route>
    <Route exact path="/explorar/bebidas">
      <ExplorerFoodsDrinks title="Explorar Bebidas" visible={ false } />
    </Route>
    <Route exact path="/explorar/comidas/ingredientes">
      <ExplorerByIngridients title="Explorar Ingredientes" visible={ false } />
    </Route>
    <Route exact path="/explorar/bebidas/ingredientes">
      <ExplorerByIngridients title="Explorar Ingredientes" visible={ false } />
    </Route>
    <Route exact path="/perfil">
      <Profile title="Perfil" visible={ false } />
    </Route>
    <Route exact path="/receitas-feitas">
      <RecipesFavDone title="Receitas Feitas" visible={ false } />
    </Route>
    <Route exact path="/receitas-favoritas">
      <RecipesFavDone title="Receitas Favoritas" visible={ false } />
    </Route>
    <Route exact path="/explorar/comidas/area">
      <ExplorerByArea title="Explorar Origem" />
    </Route>
    <Route
      exact path="/comidas/:id"
      render={ (props) => (
        <Details title="Comidas" { ...props } />
      ) }
    />
    <Route
      exact path="/bebidas/:id"
      render={ (props) => (
        <Details title="Bebidas" { ...props } />
      ) }
    />
    <Route
      path="/comidas/:id/in-progress"
      render={ (props) => (
        <RecipesInProgress title="Comidas" { ...props } />
      ) }
    />
    <Route
      path="/bebidas/:id/in-progress"
      render={ (props) => (
        <RecipesInProgress title="Bebidas" { ...props } />
      ) }
    />
  </Switch>
);
export default Routes;
