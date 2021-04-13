import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import DetalhesComida from './pages/DetalhesComida';
import DetalhesBebida from './pages/DetalhesBebida';
import ProgressoComida from './pages/ProgressoComida';
import ProgressoBebida from './pages/ProgressoBebida';
import Explorar from './pages/Explorar';
import Perfil from './pages/Perfil';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ComidasIngredientes from './pages/ComidasIngredientes';
import BebidasIngredientes from './pages/BebidasIngredientes';
import Area from './pages/Area';

function App() {
  return (
    <Router>
      <RecipesProvider>
        <Switch>
          <Route exact path="/comidas" component={ Comidas } />
          <Route exact path="/bebidas" component={ Bebidas } />
          <Route exact path="/explorar" component={ Explorar } />
          <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
          <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ComidasIngredientes }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ BebidasIngredientes }
          />
          <Route exact path="/explorar/comidas/area" component={ Area } />
          <Route exact path="/perfil" component={ Perfil } />
          <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas/:id/in-progress" component={ ProgressoComida } />
          <Route exact path="/bebidas/:id/in-progress" component={ ProgressoBebida } />
          <Route path="/comidas/:id" component={ DetalhesComida } />
          <Route path="/bebidas/:id" component={ DetalhesBebida } />
          <Route component={ NotFound } />
        </Switch>
      </RecipesProvider>
    </Router>
  );
}

export default App;
