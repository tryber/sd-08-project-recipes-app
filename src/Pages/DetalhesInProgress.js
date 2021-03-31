import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Detalhes.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import shareIcon from '../images/shareIcon.svg';
import Loading from '../components/Loading';
import RecipeContext from '../context/RecipeContext';
import LinkCopiado from '../components/LinkCopiado';
import ButtonFinish from '../components/ButtonFinish';
import IngredientsCheckbox from '../components/IngredientsCheckbox';
import FavoriteBtn from '../components/FavoriteBtn';

function DetalhesInProgress() {
  const TWO_SECONDS = 2000;
  const history = useHistory();
  const urlText = history.location.pathname;
  const urlDetails = urlText.split('/in-progress');
  console.log(urlDetails[0]);
  const id = urlText.split('/')[2];
  const [objDetail, setObjDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(objDetail);

  const { setCopied } = useContext(RecipeContext);

  const requestByID = async () => {
    let response = [];
    if (urlText.includes('bebidas')) {
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const responseJson = await response.json();
      await setObjDetail(responseJson.drinks);
    }
    if (urlText.includes('comidas')) {
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const responseJson = await response.json();
      await setObjDetail(responseJson.meals);
    }
    setTimeout(() => {
      setLoading(false);
    }, TWO_SECONDS);
  };

  const handleCopied = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, TWO_SECONDS);
  };

  useEffect(() => {
    requestByID();
  }, []);

  const renderDrink = () => (
    <div className="details">
      <h1
        data-testid="recipe-category"
      >
        {`${objDetail[0].strCategory} (${objDetail[0].strAlcoholic})`}
      </h1>
      <h2 data-testid="recipe-title">{objDetail[0].strDrink}</h2>
      <img
        data-testid="recipe-photo"
        className="food-image"
        src={ objDetail[0].strDrinkThumb }
        alt={ objDetail[0].strDrink }
      />
      <div>
        <CopyToClipboard
          text={ `http://localhost:3000${urlDetails[0]}` }
          onCopy={ () => {
            handleCopied();
          } }
        >
          <input
            type="image"
            data-testid="share-btn"
            src={ shareIcon }
            alt={ objDetail[0].strDrink }
          />
        </CopyToClipboard>
        <LinkCopiado />
        <FavoriteBtn urlText={ urlText } objDetail={ objDetail } id={ id } />
      </div>
      <IngredientsCheckbox objDetail={ objDetail } id={ id } url={ urlText } />
      <p data-testid="instructions">{objDetail[0].strInstructions}</p>
      <ButtonFinish objDetail={ objDetail } />
    </div>

  );

  const renderFood = () => (
    <div className="details">
      <h1 data-testid="recipe-category">{objDetail[0].strCategory}</h1>
      <h2 data-testid="recipe-title">{objDetail[0].strMeal}</h2>
      <img
        data-testid="recipe-photo"
        src={ objDetail[0].strMealThumb }
        alt={ objDetail[0].strMeal }
      />
      <div>
        <CopyToClipboard
          text={ `http://localhost:3000${urlDetails[0]}` }
          onCopy={ () => {
            handleCopied();
          } }
        >
          <input
            type="image"
            data-testid="share-btn"
            src={ shareIcon }
            alt={ objDetail[0].strMeal }
          />
        </CopyToClipboard>
        <LinkCopiado />
        <FavoriteBtn urlText={ urlText } objDetail={ objDetail } id={ id } />
      </div>
      <IngredientsCheckbox objDetail={ objDetail } id={ id } url={ urlText } />
      <p data-testid="instructions">{objDetail[0].strInstructions}</p>
      <ButtonFinish objDetail={ objDetail } />
    </div>

  );

  const render = () => {
    const value = history.location.pathname;
    if (value.includes('comidas')) {
      return renderFood();
    }
    if (value.includes('bebidas')) {
      return renderDrink();
    }
  };

  return (
    <div>
      {loading ? <Loading /> : render()}
    </div>
  );
}

export default DetalhesInProgress;
