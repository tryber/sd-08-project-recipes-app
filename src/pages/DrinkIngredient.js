import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import { fetchDrinkIngredientThunk } from '../redux/actions/fetchIngridientsAction';

function DrinkIngredient() {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state) => state.recipes);

  useEffect(() => {
    const dataDispatch = () => dispatch(fetchDrinkIngredientThunk());
    dataDispatch();
  }, []);

  return (
    <section className="Explore-main-container-drink">
      <Header />
      <section className="cards-section">
        {ingredients && ingredients
          .map(({ strIngredient1 }, index) => (<IngredientCard
            key={ strIngredient1 }
            ingredient={ strIngredient1 }
            index={ index }
            recipe="drink"
          />))}
      </section>
      <Footer />
    </section>
  );
}

export default DrinkIngredient;
