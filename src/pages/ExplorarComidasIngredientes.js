import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import getIngredients from '../helpers/ingredientsApi';
import CardIngredientsFoods from '../components/CardIngredientsFoods';

export default function FoodIngredientes() {
  const [ingredients, setIngrediets] = useState('');
  const zero = 0;
  const twelve = 12;

  useEffect(() => {
    async function fetchIngredients() {
      const response = await getIngredients('listIngredient', '');
      setIngrediets(response.meals);
    }
    fetchIngredients();
  }, [setIngrediets]);

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      { (ingredients.length > zero)
        && ingredients.map((ingredient, index) => {
          if (index < twelve) {
            return (
              <CardIngredientsFoods
                index={ index }
                name={ ingredient.strIngredient }
                key={ index }
              />
            );
          }
          return null;
        })}
      <Footer />
    </div>
  );
}
