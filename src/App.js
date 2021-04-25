import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipesProvider from './ContextApi/RecipesProvider';
import RecipesFood from './pages/RecipesFood';
import Login from './pages/Login';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    // gif inicial da Trybe
    // <div className="meals">
    //   <span className="logo">TRYBE</span>
    //   <object
    //     className="rocksGlass"
    //     type="image/svg+xml"
    //     data={ rockGlass }
    //   >
    //     Glass
    //   </object>
    // </div>
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ RecipesFood } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
