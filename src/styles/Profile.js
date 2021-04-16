import styled from 'styled-components';

const StyledProfile = styled.main`
  h5 {
    margin: 20px 10px;

    &::before {
      content: 'E-mail: ';
    }
  }

  .btn-container {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 10px;
    flex-wrap: wrap;

    button {
      background-color: #f8c365;
      border: none;
      border-radius: 5px;
      padding: 0 10px;
      margin: 2px 0;
      width: 30%;
      opacity: 0.8;
      word-wrap: break-word;

      &:hover {
        opacity: 1;
      }
    }
  }
`;

export default StyledProfile;
