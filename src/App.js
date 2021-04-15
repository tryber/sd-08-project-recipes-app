import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalProvider from './context/globalContext/GlobalProvider';
import Routes from './routes';

function App() {
  return (
    <GlobalProvider>
      <Routes />
    </GlobalProvider>
  );
}

export default App;
