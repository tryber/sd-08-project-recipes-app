import React from 'react';

import RecipesProvider from './ContextApi/RecipesProvider';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';

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
      <Routes />
    </RecipesProvider>
  );
}

export default App;
