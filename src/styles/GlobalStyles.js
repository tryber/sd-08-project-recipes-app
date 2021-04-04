import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Quicksand', sans-serif;
  }

  body {
    background-color: #f9f1c0;
    margin-bottom: 80px;
  }
`;

export default GlobalStyles;
