import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ConxtextProvider from './context';
import './App.css';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import MainFoods from './pages/MainFoods';
import MainDrinks from './pages/MainDrinks';
import Explorer from './pages/Explorer';
import ExplorerFods from './pages/ExplorerFods';
import ExplorerDrinks from './pages/ExplorerDrinks';
import ExploreByIngredients from './pages/ExploreByIngredients';
import Origin from './pages/Origin';
import Profile from './pages/Profile';
import RecipesDone from './pages/RecipesDone';
import RecipesFav from './pages/RecipesFav';
import DetailsFood from './pages/DetailsFood';
import DetailsDrink from './pages/DetailsDrink';
import FoodInProgress from './pages/FoodInProgress';
import DrinkInProgress from './pages/DrinkInProgress';

function App() {
  return (
    <ConxtextProvider>
      <Switch>
        <Route exact path="/explorar/comidas/ingredientes">
          <ExploreByIngredients drinksOrFoods="foods" />
        </Route>
        <Route exact path="/explorar/bebidas/ingredientes">
          <ExploreByIngredients drinksOrFoods="drinks" />
        </Route>
        <Route path="/comidas/ingredientes/:filter" component={ MainFoods } />
        <Route path="/bebidas/ingredientes/:filter" component={ MainDrinks } />
        <Route path="/explorar/bebidas/area" component={ NotFound } />
        <Route exact path="/explorar/comidas/area" component={ Origin } />
        <Route exact path="/explorar/comidas" component={ ExplorerFods } />
        <Route path="/explorar/bebidas" component={ ExplorerDrinks } />
        <Route path="/explorar" component={ Explorer } />
        <Route path="/comidas/:id/in-progress" component={ FoodInProgress } />
        <Route path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
        <Route path="/comidas/:id" component={ DetailsFood } />
        <Route path="/bebidas/:id" component={ DetailsDrink } />
        <Route path="/comidas/" component={ MainFoods } />
        <Route path="/bebidas/" component={ MainDrinks } />
        <Route path="/receitas-feitas" component={ RecipesDone } />
        <Route path="/receitas-favoritas" component={ RecipesFav } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/" component={ Login } />
      </Switch>
    </ConxtextProvider>
  );
}

export default App;
