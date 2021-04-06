import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import Provider from './contextApi/loginPassContext';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Provider>
          <Routes />
        </Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
