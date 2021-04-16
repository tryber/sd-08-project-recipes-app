import styled from 'styled-components';

const RecipesDetails = styled.main`
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

    p {
      margin-bottom: 5px;
    }
  }

  .instructions {
    line-height: 1.5;
    margin: 10px;
  }

  .video-container {
    margin: 10px auto;
    overflow: hidden;
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
    position: relative;
    width: 90%;
  }

  iframe {
    border: none;
    bottom: 0;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
  }

  .start-resume-recipe {
    background-color: green;
    border: 1px solid black;
    border-radius: 10px;
    bottom: 0;
    color: white;
    font-weight: 600;
    left: 2.5%;
    padding: 10px;
    position: fixed;
    text-align: center;
    text-decoration: none;
    width: 95%;
  }
`;

export default RecipesDetails;
