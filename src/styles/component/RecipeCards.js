// import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledRecipeCards = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 5px 5px 5px grey;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 5vw;
  width: 40vw;

  img {
    border-radius: 10px 10px 0 0;
    width: 100%;
  }

  p {
    background-color: #f8c365;
    border-radius: 0 0 10px 10px;
    border-top: 1px solid #ccc;
    margin: 0;
    padding: 5px 0;
    text-align: center;
  }
`;

export default StyledRecipeCards;
