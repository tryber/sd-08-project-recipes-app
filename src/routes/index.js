import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Comidas from '../pages/Comidas';
import ProfilePage from '../pages/PerfilPágina';
import Bebidas from '../pages/Bebidas';
import Explore from '../pages/Explorar';
import Detalhes from '../pages/Detalhes';
import ExplorarIngredientes from '../pages/ExplorarIngredientes';
import FeitasFavoritas from '../pages/FeitasFavoritas';
import ExplorarComidas from '../pages/ExplorarComidas';
import ExplorarBebidas from '../pages/ExplorarBebidas';
import ExplorarArea from '../pages/ExplorarArea';
import ReceitasInProgress from '../pages/ReceitasEmProgress';
import NotFound from '../pages/NotFound';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/comidas" component={ Comidas } />
    <Route exact path="/comidas/:id/in-progress" component={ ReceitasInProgress } />
    <Route exact path="/comidas/:id" component={ Detalhes } />
    <Route exact path="/bebidas" component={ Bebidas } />
    <Route exact path="/bebidas/:id/in-progress" component={ ReceitasInProgress } />
    <Route exact path="/bebidas/:id" component={ Detalhes } />
    <Route exact path="/explorar" component={ Explore } />
    <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
    <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
    <Route
      exact
      path="/explorar/comidas/ingredientes"
      component={ ExplorarIngredientes }
    />
    <Route exact path="/explorar/comidas/area" component={ ExplorarArea } />
    <Route
      exact
      path="/explorar/bebidas/ingredientes"
      component={ ExplorarIngredientes }
    />
    <Route exact path="/perfil" component={ ProfilePage } />
    <Route exact path="/receitas-feitas" component={ FeitasFavoritas } />
    <Route exact path="/receitas-favoritas" component={ FeitasFavoritas } />
    <Route component={ NotFound } />
  </Switch>
);

export default Routes;
