import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Bebida, BebidaDetalhes, Comida, ComidaDetalhes,
  Explorar, ExplorarComida, ExplorarBebida, ComidaIngredientes,
  BebidaIngredientes, ComidaArea, BebidaArea, Perfil, ReceitasFeitas,
  ReceitasFavoritas } from '../pages';
import ContextRoute from '../context-route/ContextRoute';
import UserProvider from '../context/userContext/UserProvider';
import FoodProvider from '../context/comidaContext/FoodProvider';
import DrinkProvider from '../context/bebidaContext/DrinkProvider';
import GlobalProvider from '../context/globalContext/GlobalProvider';
import ComidaProgresso from '../pages/comida/processo';
import BebidaProgresso from '../pages/bebida/processo';

function Routes() {
  return (
    <Switch>
      <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
      <ContextRoute
        exact
        path="/perfil"
        contextComponent={ GlobalProvider }
        component={ Perfil }
      />
      <Route path="/explorar/comidas/area" component={ ComidaArea } />
      <Route path="/explorar/bebidas/area" component={ BebidaArea } />
      <Route path="/explorar/comidas/ingredientes" component={ ComidaIngredientes } />
      <Route path="/explorar/bebidas/ingredientes" component={ BebidaIngredientes } />
      <Route path="/explorar/comidas" component={ ExplorarComida } />
      <Route path="/explorar/bebidas" component={ ExplorarBebida } />
      <Route path="/explorar" component={ Explorar } />
      <ContextRoute
        exact
        path="/bebidas/:idDaReceita/in-progress"
        contextComponent={ DrinkProvider }
        component={ BebidaProgresso }
      />
      <ContextRoute
        exact
        path="/comidas/:idDaReceita/in-progress"
        contextComponent={ FoodProvider }
        component={ ComidaProgresso }
      />
      <ContextRoute
        exact
        path="/bebidas/:idDaReceita"
        contextComponent={ DrinkProvider }
        component={ BebidaDetalhes }
      />
      <ContextRoute
        exact
        path="/comidas/:idDaReceita"
        contextComponent={ FoodProvider }
        component={ ComidaDetalhes }
      />
      <ContextRoute
        exact
        path="/bebidas"
        contextComponent={ DrinkProvider }
        component={ Bebida }
      />
      <ContextRoute
        exact
        path="/comidas"
        contextComponent={ FoodProvider }
        component={ Comida }
      />
      <ContextRoute
        exact
        path="/"
        contextComponent={ UserProvider }
        component={ Login }
      />
    </Switch>
  );
}

export default Routes;
