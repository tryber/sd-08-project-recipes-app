import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import { fetchIngredientThunk } from '../redux/actions/fetchIngridientsAction';

function FoodIngredient() {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state) => state.recipes);

  useEffect(() => {
    const dataDispatch = () => dispatch(fetchIngredientThunk());
    dataDispatch();
  }, []);
  return (
    <section className="Explore-main-container-meal">
      <Header />
      <section className="cards-section">
        {ingredients && ingredients
          .map(({ strIngredient }, index) => (<IngredientCard
            key={ strIngredient }
            ingredient={ strIngredient }
            index={ index }
            recipe="meal"
          />))}
      </section>
      <Footer />
    </section>
  );
}

export default FoodIngredient;
