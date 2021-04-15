import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardIngredientsFoods from '../components/CardIngredientsFoods';
import getMeals from '../helpers/ingredientsApi';

export default function FoodIngredientes() {
  const [ingredients, setIngrediets] = useState('');
  const zero = 0;
  const twelve = 12;

  useEffect(() => {
    async function fetchIngredients() {
      const response = await getMeals('listIngredient', '');
      setIngrediets(response.meals);
    }
    fetchIngredients();
  }, [setIngrediets]);

  return (
    <div>
      <Container>
        <Header title="Explorar Ingredientes" />
        <center>
          <div className="d-flex justify-content-around flex-wrap">
            { (ingredients.length > zero)
        && ingredients.map((ingredient, index) => {
          if (index < twelve) {
            return (
              <CardIngredientsFoods
                index={ index }
                name={ ingredient.strIngredient }
                key={ index }
                isMeal
              />
            );
          }
          return null;
        })}
          </div>
        </center>
      </Container>
      <br />
      <br />
      <br />
      <Footer className="footer orange" />
    </div>
  );
}
