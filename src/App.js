import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './core/Provider';
import Routes from './Routes';

function App() {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
}

export default App;
