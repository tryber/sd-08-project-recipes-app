import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import { fetchDrinkIngredientThunk } from '../redux/actions/fetchDrinkIngredientThunk';

function DrinkIngredient() {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.recipes.ingredients);

  useEffect(() => {
    const dataDispatch = () => dispatch(fetchDrinkIngredientThunk());
    dataDispatch();
  }, []);
  return (
    <main>
      <Header />
      {ingredients && ingredients
        .map(({ strIngredient1 }, index) => (<IngredientCard
          key={ strIngredient1 }
          ingredient={ strIngredient1 }
          index={ index }
          recipe="drink"
        />))}
      <Footer />
    </main>
  );
}

export default DrinkIngredient;
