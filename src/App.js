import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProviderRecipes from './context/ProviderRecipes';
import './App.css';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Perfil from './pages/Perfil';
import Bebidas from './pages/Bebidas';
import DetalhesComidas from './pages/DetalhesComidas';
import DetalhesBebidas from './pages/DetalhesBebidas';
import ReceitaEmProcesso from './pages/ReceitaEmProgresso';
import Explorar from './pages/Explorar';
import ExplorarComidasEBebidas from './pages/ExplorarComidasEBebidas';
import ExplorarIngredientes from './pages/ExplorarIngredientes';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ExplorarLocalDeOrigem from './pages/ExplorarLocalDeOrigem';
import NotFound from './components/NotFound';

function App() {
  return (
    <ProviderRecipes>
      <Switch>
        <Route path="/explorar/comidas/ingredientes" component={ ExplorarIngredientes } />
        <Route path="/explorar/bebidas/ingredientes" component={ ExplorarIngredientes } />
        <Route path="/explorar/comidas/area" component={ ExplorarLocalDeOrigem } />
        <Route path="/explorar/bebidas/area" component={ NotFound } />
        <Route path="/comidas/:id/in-progress" component={ ReceitaEmProcesso } />
        <Route path="/bebidas/:id/in-progress" component={ ReceitaEmProcesso } />
        <Route path="/explorar/comidas" component={ ExplorarComidasEBebidas } />
        <Route path="/explorar/bebidas" component={ ExplorarComidasEBebidas } />
        <Route path="/comidas/:id" component={ DetalhesComidas } />
        <Route path="/bebidas/:id" component={ DetalhesBebidas } />
        <Route path="/explorar" component={ Explorar } />
        <Route path="/comidas" component={ Comidas } />
        <Route path="/bebidas" component={ Bebidas } />
        <Route path="/Perfil" component={ Perfil } />
        <Route path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </ProviderRecipes>
  );
}

export default App;
