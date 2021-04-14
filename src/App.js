import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import DetalhesComida from './pages/DetalhesComida';
import DetalhesBebida from './pages/DetalhesBebida';
import ProcessoComida from './pages/ProcessoComida';
import ProcessoBebida from './pages/ProcessoBebida';
import Explorar from './pages/Explorar';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import IngredientesComidas from './pages/IngredientesComidas';
import IngredientesBebidas from './pages/IngredientesBebidas';
import OrigemComidas from './pages/OrigemComidas';
import Perfil from './pages/Perfil';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import NaoEncontrada from './pages/NaoEncontrada';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/comidas/:id" component={ DetalhesComida } />
        <Route exact path="/bebidas/:id" component={ DetalhesBebida } />
        <Route exact path="/comidas/:id/in-progress" component={ ProcessoComida } />
        <Route exact path="/bebidas/:id/in-progress" component={ ProcessoBebida } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route
          exact
          path="/explorar/comidas"
          render={ (props) => <ExplorarComidas { ...props } endpoint="themealdb" /> }
        />
        <Route
          exact
          path="/explorar/bebidas"
          render={ (props) => <ExplorarBebidas { ...props } endpoint="thecocktaildb" /> }
        />
        <Route path="/explorar/comidas/ingredientes" component={ IngredientesComidas } />
        <Route path="/explorar/bebidas/ingredientes" component={ IngredientesBebidas } />
        <Route path="/explorar/comidas/area" component={ OrigemComidas } />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
        <Route component={ NaoEncontrada } />
      </Switch>
    </Router>
  );
}

export default App;
