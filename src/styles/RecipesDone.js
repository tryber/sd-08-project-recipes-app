import styled from 'styled-components';

const StyledProfile = styled.main`
  .filter-buttons {
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

      &:hover {
        opacity: 1;
      }
    }
  }

  .done-recipes-container {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;

    .recipe {
      margin: 10px;
      display: flex;
      align-items: center;
      border: 1px solid black;
      border-radius: 10px;
      background-color: #eee;

      .recipe-image-container {
        height: 150px;
        width: 50%;
        overflow: hidden;
        display: flex;
        border-radius: 10px 0 0 10px;
        border: none;

        img {
          max-width: 100%;
          min-height: 100%;
        }
      }

      .recipe-data {
        width: 50%;
        padding: 5px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        p {
          margin: 0;
        }

        button {
          background-color: initial;
          border: none;

          img {
            width: 20px;
          }
        }

        .recipe-tags {
          display: flex;
          flex-wrap: wrap;

          span {
            border-radius: 10px;
            background-color: #F8C365;
            padding: 2px 5px;
            margin-right: 5px;
          }
        }
      }
    }
  }
`;

export default StyledProfile;
