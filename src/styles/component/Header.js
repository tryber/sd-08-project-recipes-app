import styled from 'styled-components';

const StyledHeader = styled.header`
  align-items: center;
  background-color: #F8C365;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;

  button {
    border: none;
    background-color: inherit;
  }

  h1 {
    font-size: 1.9rem;
    margin: 0;
    text-align: right;
  }
`;

export default StyledHeader;
