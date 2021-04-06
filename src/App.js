import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import Perfil from './pages/Perfil';
import Bebidas from './pages/Bebidas';
import Explorar from './pages/Explorar';
import DetalhesComidas from './pages/DetalhesComidas';
import DetalhesBebidas from './pages/DetalhesBebidas';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExpBebidasIngred from './pages/ExpBebidasIngred';
import ExpComidasIngred from './pages/ExpComidasIngred';
import ExpComidasOrigem from './pages/ExpComidasOrigem';
import EmProgresso from './pages/EmProgresso';
import EmProgressoBebidas from './pages/EmProgressoBebidas';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Comidas } />
      <Route exact path="/perfil" component={ Perfil } />
      <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route exact path="/bebidas" component={ Bebidas } />
      <Route exact path="/explorar" component={ Explorar } />
      <Route exact path="/comidas/:id" component={ DetalhesComidas } />
      <Route exact path="/bebidas/:id" component={ DetalhesBebidas } />
      <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
      <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route exact path="/explorar/comidas/ingredientes" component={ ExpComidasIngred } />
      <Route exact path="/explorar/comidas/area" component={ ExpComidasOrigem } />
      <Route exact path="/explorar/bebidas/ingredientes" component={ ExpBebidasIngred } />
      <Route exact path="/comidas/:id/in-progress" component={ EmProgresso } />
      <Route exact path="/bebidas/:id/in-progress" component={ EmProgressoBebidas } />
      <Route path="/" component={ NotFound } />
    </Switch>
  );
}

export default App;
