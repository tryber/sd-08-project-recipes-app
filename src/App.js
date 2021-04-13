import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Main from './pages/Main';
import Explore from './pages/Explore';
import ExploreMain from './pages/ExploreMain';
import ExploreIngredients from './pages/ExploreIngredients';
import ExploreOrigin from './pages/ExploreOrigin';
import RecipeDetails from './pages/RecipeDetails';
import Profile from './pages/Profile';
import RecipesDoneAndFavorite from './pages/RecipesDoneAndFavorite';
import NotFound from './pages/NotFound';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route
        path="/bebidas/:id/in-progress"
        render={ (props) => <RecipeDetails { ...props } /> }
      />
      <Route
        path="/comidas/:id/in-progress"
        render={ (props) => <RecipeDetails { ...props } /> }
      />
      <Route path="/bebidas/:id" render={ (props) => <RecipeDetails { ...props } /> } />
      <Route path="/comidas/:id" render={ (props) => <RecipeDetails { ...props } /> } />
      <Route path="/explorar/comidas/ingredientes" component={ ExploreIngredients } />
      <Route path="/explorar/bebidas/ingredientes" component={ ExploreIngredients } />
      <Route path="/explorar/comidas/area" component={ ExploreOrigin } />
      <Route path="/explorar/comidas" component={ ExploreMain } />
      <Route exact path="/explorar/bebidas" component={ ExploreMain } />
      <Route path="/receitas-feitas" component={ RecipesDoneAndFavorite } />
      <Route path="/receitas-favoritas" component={ RecipesDoneAndFavorite } />
      <Route exact path="/explorar" component={ Explore } />
      <Route path="/bebidas" component={ Main } />
      <Route path="/comidas" component={ Main } />
      <Route path="/perfil" component={ Profile } />
      <Route exact path="/" component={ Login } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default App;
