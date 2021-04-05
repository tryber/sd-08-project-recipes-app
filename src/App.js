import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import ProviderReceitas from './context/ProviderReceitas';
import {
  Login,
  Comidas,
  Bebidas,
  NotFound,
  DetalhesReceita,
  ExplorarBebidaOuComida,
  ExplorarComidas,
  ExplorarBebidas,
  ExplorarIngredientesComidas,
  ExplorarPorLocalDeOrigem,
  ExplorarIngredientesBebidas,
  Perfil,
  ReceitasFeitas,
  ReceitasFavoritas,
  ReceitaEmProgresso,
} from './pages';

function App() {
  return (
    <div className="main">
      <ProviderReceitas>
        <Switch>
          <Route exact path="/comidas" component={ Comidas } />
          <Route exact path="/comidas/:id/in-progress" component={ ReceitaEmProgresso } />
          <Route exact path="/comidas/:id" component={ DetalhesReceita } />
          <Route exact path="/bebidas" component={ Bebidas } />
          <Route exact path="/bebidas/:id/in-progress" component={ ReceitaEmProgresso } />
          <Route exact path="/bebidas/:id" component={ DetalhesReceita } />
          <Route exact path="/explorar" component={ ExplorarBebidaOuComida } />
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
          <Route
            exact
            path="/explorar/comidas/area"
            component={ ExplorarPorLocalDeOrigem }
          />
          <Route exact path="/perfil" component={ Perfil } />
          <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
          <Route
            exact
            path="/explorar/bebidas/area"
            component={ NotFound }
          />
          <Route exact path="/" component={ Login } />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </ProviderReceitas>
    </div>
  );
}

export default App;
