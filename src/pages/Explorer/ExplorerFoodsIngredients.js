import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { showCompleteLists } from '../../services/api';
import IngredientCard from '../../components/Card/IngredientCard';
import './ExplorerIngredients.css';

function ExplorerFoodsIngredients() {
  const STOP_INDEX = 11;
  const [ingredientsList, setIngredientsList] = useState([]);
  const [redirectToFoods, setRedirectToFoods] = useState('');

  useEffect(() => {
    async function requestNSet() {
      const requestList = await showCompleteLists('ingredients', 'Foods');
      setIngredientsList(requestList.meals);
    } requestNSet();
  }, []);

  return (
    <div>
      <Header name="Explorar Ingredientes" icon="false" currentPage="Foods" />
      <div className="ingredient-card-complete-container">
        {ingredientsList && ingredientsList
          .filter((ingredient, index) => index <= STOP_INDEX)
          .map((item, index) => (
            <IngredientCard
              key={ item.idIngredient }
              id={ item.idIngredient }
              name={ item.strIngredient }
              img={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
              index={ index }
              onClick={ () => setRedirectToFoods({
                pathname: '/comidas',
                state: { fromExplorerFoodsIngredients: true,
                  ingredient: item.strIngredient },
              }) }
            />
          ))}
      </div>
      <Footer />
      {redirectToFoods !== '' ? <Redirect to={ redirectToFoods } /> : ''}
    </div>
  );
}

export default ExplorerFoodsIngredients;
