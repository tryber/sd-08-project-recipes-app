import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardIngredientsDrinks from '../components/CardIngredientsDrinks';
import getDrinks from '../helpers/drinkApi';

export default function DrinkIngredients() {
  const [ingredients, setIngrediets] = useState('');
  const zero = 0;
  const twelve = 12;
  useEffect(() => {
    async function fetchIngredients() {
      const response = await getDrinks('listIngredient', '');
      setIngrediets(response.drinks);
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
      <CardIngredientsDrinks
        index={ index }
        name={ ingredient.strIngredient1 }
        key={ index }
        isMeal={ false }
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
