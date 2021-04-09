import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Bebida from './pages/Bebida';
import Bebidas from './pages/Bebidas';
import BebidasEmProgresso from './pages/BebidasEmProgresso';
import Comida from './pages/Comida';
import Comidas from './pages/Comidas';
import ComidasEmProgresso from './pages/ComidasEmProgresso';
import Explorar from './pages/Explorar';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarIngredientesBebidas from './pages/ExplorarIngredientesBebidas';
import ExplorarIngredientesComidas from './pages/ExplorarIngredientesComidas';
import ExplorarRegiaoComidas from './pages/ExplorarRegiaoComidas';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import ReceitasFavoritadas from './pages/ReceitasFavoritadas';
import ReceitasFeitas from './pages/ReceitasFeitas';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Comidas } />
      <Route exact path="/bebidas" component={ Bebidas } />
      <Route exact path="/comidas/:id" component={ Comida } />
      <Route exact path="/bebidas/:id" component={ Bebida } />
      <Route exact path="/comidas/:id/in-progress" component={ ComidasEmProgresso } />
      <Route exact path="/bebidas/:id/in-progress" component={ BebidasEmProgresso } />
      <Route exact path="/explorar" component={ Explorar } />
      <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
      <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExplorarIngredientesComidas }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExplorarIngredientesBebidas }
      />
      <Route exact path="/explorar/comidas/area" component={ ExplorarRegiaoComidas } />
      <Route exact path="/perfil" component={ Perfil } />
      <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route exact path="/receitas-favoritas" component={ ReceitasFavoritadas } />
    </Switch>
  );
}

export default Routes;
