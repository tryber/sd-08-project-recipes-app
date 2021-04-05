import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes/routes';
import ContextFood from './context/ContextFood';
import ContextDrink from './context/ContextDrink';

function App() {
  return (
    <ContextFood>
      <ContextDrink>
        <Routes />
      </ContextDrink>
    </ContextFood>
  );
}

export default App;

// import styled from 'styled-components';
// import React from 'react';

// const AppContainer = styled.div`
//   width: 100%;
//   height: 100%
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// function App() {
//   return <AppContainer>Hello</AppContainer>;
// }

// export default App;
