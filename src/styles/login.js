import styled from 'styled-components';

const StyledLogin = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 5px 5px 5px grey;
  display: flex;
  flex-direction: column;
  margin: 20vh auto;
  padding: 30px;
  width: 260px;

  img {
    margin-bottom: 10px;
    width: 100px;
  }

  input {
    border: 1px solid #ccc;
    border-radius: 7px;
    margin-bottom: 10px;
    padding: 5px 10px;
    width: 100%;
  }

  button {
    background-color: green;
    border-radius: 5px;
    color: white;
    opacity: 0.8;
    padding: 4px 16px;
    transition: 0.3s;
    width: 100%;

    &:hover {
      opacity: 1;
    }

    &:disabled {
      background-color: red;
      cursor: not-allowed;
    }
  }
`;

export default StyledLogin;
