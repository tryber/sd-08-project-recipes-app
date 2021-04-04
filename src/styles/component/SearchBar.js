import styled from 'styled-components';

const StyledSearchBar = styled.form`
  padding: 10px;
  margin: 5px 10px 10px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;

  .search-input {
    border: 1px solid #ccc;
    border-radius: 7px;
    padding: 5px 10px;
    width: 100%;
  }

  .parameters {
    display: flex;
    justify-content: space-evenly;

    label {
      input {
        margin: 5px;
      }
    }
  }

  button {
    background-color: #F0544F;
    border-radius: 5px;
    color: white;
    font-size: 600;
    opacity: 0.8;
    padding: 4px 16px;
    transition: 0.3s;
    width: 100%;

    &:hover {
      opacity: 1;
    }
  }
`;

export default StyledSearchBar;
