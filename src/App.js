import React from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Food from './pages/Food';
import Drinks from './pages/Drinks';
import Item from './components/Item';
import Perfil from './pages/Perfil';
import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreDrink from './pages/ExploreDrink';
import FoodArea from './pages/FoodArea';
import ExploreFoodIngredients from './pages/ExploreFoodIngredients';
import ExploreDrinkIngredients from './pages/ExploreDrinkIngredients';
import NotFound from './pages/NotFound';
import RecipesDone from './pages/RecipesDone';
import RecipesFavorites from './pages/RecipesFavorites';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route path="/comidas/:id" render={ (props) => <Item { ...props } /> } />
        <Route path="/bebidas/:id" render={ (props) => <Item { ...props } /> } />
        <Route path="/comidas" render={ (props) => <Food { ...props } /> } />
        <Route path="/bebidas" render={ (props) => <Drinks { ...props } /> } />
        <Route path="/perfil" render={ (props) => <Perfil { ...props } /> } />
        <Route exact path="/explorar" render={ (props) => <Explore { ...props } /> } />
        <Route
          exact
          path="/explorar/comidas"
          render={ (props) => <ExploreFood { ...props } /> }
        />
        <Route
          exact
          path="/explorar/bebidas"
          render={ (props) => <ExploreDrink { ...props } /> }
        />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          render={ (props) => <ExploreFoodIngredients { ...props } /> }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          render={ (props) => <ExploreDrinkIngredients { ...props } /> }
        />
        <Route
          exact
          path="/explorar/comidas/area"
          render={ (props) => <FoodArea { ...props } /> }
        />
        <Route exact path="/explorar/bebidas/area" component={ NotFound } />
        <Route
          path="/receitas-feitas"
          render={ (props) => <RecipesDone { ...props } /> }
        />
        <Route
          path="/receitas-favoritas"
          render={ (props) => <RecipesFavorites { ...props } /> }
        />
        { /* <Route path="/comidas/{id-da-receita}/in-progress" />
        <Route path="/bebidas/{id-da-receita}/in-progress" />
        <Route path="/receitas-favoritas" /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
