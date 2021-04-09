import React from 'react';
import Provider from './context/Provider';
import Routes from './routes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
}

export default App;
