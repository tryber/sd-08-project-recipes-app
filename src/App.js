import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ExplorarComidas from './Pages/Explorar/ExplorarComidas';
import Provider from './context/Provider';
import Bebidas from './Pages/Bebidas';
import Comidas from './Pages/Comidas';
import Detalhes from './Pages/Detalhes';
import Explorar from './Pages/Explorar/Explorar';
import Login from './Pages/Login';
import Perfil from './Pages/Perfil';
import DetalhesInProgress from './Pages/DetalhesInProgress';
import ReceitasFeitas from './Pages/ReceitasFeitas';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './Pages/NotFound';

import './App.css';
import ReceitasFavoritas from './Pages/ReceitasFavoritas';
import ExplorarBebidas from './Pages/Explorar/ExplorarBebidas';
import ExplorarBebidasIngredientes from './Pages/Explorar/ExplorarBebidasIngredientes';
import ExplorarComidasIngredientes from './Pages/Explorar/ExplorarComidasIngredientes';
import ExpComidasArea from './Pages/Explorar/ExpComidasArea';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/comidas/:id" component={ Detalhes } />
        <Route exact path="/bebidas/:id" component={ Detalhes } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/bebidas/:id" component={ Detalhes } />
        <Route exact path="/comidas/:id/in-progress" component={ DetalhesInProgress } />
        <Route exact path="/bebidas/:id/in-progress" component={ DetalhesInProgress } />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route exact path="/explorar/comidas/area" component={ ExpComidasArea } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExplorarComidasIngredientes }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExplorarBebidasIngredientes }
        />
        <Route component={ NotFound } />
      </Switch>
    </Provider>
  );
}

export default App;
