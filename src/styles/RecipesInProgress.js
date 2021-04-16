import styled from 'styled-components';

const StyledProgress = styled.main`
  img {
    width: 100%;
  }

  h1,
  h5 {
    margin: 10px;
  }

  .interaction-btns {
    display: flex;
    margin: 5px;
  }

  .ingredient {
    margin: 10px;

    input {
      margin-right: 5px;
    }
  }

  .instructions {
    line-height: 1.5;
    margin: 10px;
  }
  
  .finish-btn {
    background-color: green;
    border: 1px solid black;
    border-radius: 10px;
    color: white;
    font-weight: 600;
    margin: 10px 2.5%;
    padding: 10px;
    text-align: center;
    transition: 0.5s;
    width: 95%;

    &:disabled {
      background-color: #F0544F;
      cursor: not-allowed;
      opacity: 0.8;
    }
  }
`;

export default StyledProgress;
