import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Explore from './pages/Explore';
import ExploreFoodDrink from './pages/ExploreFoodDrink';
import DrinkIngredient from './pages/DrinkIngredient';
import FoodIngredient from './pages/FoodIngredient';
import ExploreOrigin from './pages/ExploreOrigin';
import MealsRecipes from './pages/MealsRecipes';
import DrinksRecipes from './pages/DrinksRecipes';
import FoodDetail from './pages/FoodDetail';
import FinishedRecipes from './pages/FinishedRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import NotFound from './pages/NotFound';
import ProgressMeal from './pages/ProgressMeal';
import ProgressDrink from './pages/ProgressDrink';

function App() {
  return (
    <main>
      <div className="main-container">
        <Switch>
          <Route exact path="/perfil" component={ ProfilePage } />
          <Route exact path="/explorar" component={ Explore } />
          <Route path="/explorar/comidas/ingredientes" component={ FoodIngredient } />
          <Route path="/explorar/bebidas/ingredientes" component={ DrinkIngredient } />
          <Route path="/explorar/comidas/area" component={ ExploreOrigin } />
          <Route path="/explorar/bebidas/area" component={ NotFound } />
          <Route exact path="/comidas" component={ MealsRecipes } />
          <Route exact path="/bebidas" component={ DrinksRecipes } />
          <Route path="/comidas/:idMeal/in-progress" component={ ProgressMeal } />
          <Route path="/bebidas/:idDrink/in-progress" component={ ProgressDrink } />
          <Route path="/comidas/:idMeal?" component={ FoodDetail } />
          <Route path="/bebidas/:idDrink?" component={ FoodDetail } />
          <Route exact path="/" component={ LoginPage } />
          <Route path="/explorar/" component={ ExploreFoodDrink } />
          <Route path="/receitas-feitas" component={ FinishedRecipes } />
          <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
        </Switch>
      </div>
    </main>
  );
}

export default App;

// ROTAS do README
// Tela de login: /;
// Tela principal de receitas de comidas: /comidas;
// Tela principal de receitas de bebidas: /bebidas;
// Tela de detalhes de uma receita de comida: /comidas/{id-da-receita};
// Tela de detalhes de uma receita de bebida: /bebidas/{id-da-receita};
// Tela de receita em processo de comida: /comidas/{id-da-receita}/in-progress;
// Tela de receita em processo de bebida: /bebidas/{id-da-receita}/in-progress;
// Tela de explorar: /explorar;
// Tela de explorar comidas: /explorar/comidas;
// Tela de explorar bebidas: /explorar/bebidas;
// Tela de explorar comidas por ingrediente: /explorar/comidas/ingredientes;
// Tela de explorar bebidas por ingrediente: /explorar/bebidas/ingredientes;
// Tela de explorar comidas por local de origem: /explorar/comidas/area;
// Tela de perfil: /perfil;
// Tela de receitas feitas: /receitas-feitas;
// Tela de receitas favoritas: /receitas-favoritas.
