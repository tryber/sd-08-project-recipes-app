import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import getResultFromAPI from '../api/getResultFromAPI';
import contextRecipes from '../context/Context';
import Button from '../components/Button';
import Footer from '../components/Footer';
import FoodCard from '../components/FoodCard';

const Bebidas = () => {
  const [drinks, setDrinks] = useState([]);
  const [targetButton, setTargetButton] = useState('');

  const { filter, drinksCategories,
    mainIngredient, setMain } = useContext(contextRecipes);
  const BOOLEAN_FALSE = false;

  useEffect(() => {
    async function getDrinksFromAPI() {
      let drinksAPI = '';
      if (mainIngredient === '') {
        drinksAPI = await getResultFromAPI('/bebidas');
      } else {
        drinksAPI = await getResultFromAPI('/bebidas', 'Ingredients', mainIngredient);
        setMain('');
      }

      setDrinks(drinksAPI);
    }
    getDrinksFromAPI();
  }, []);

  useEffect(() => {
    setDrinks(filter);
  }, [filter]);

  const filterByCategory = async (category, { target: { innerHTML } }) => {
    let filterdBtn;
    if (innerHTML !== targetButton) {
      filterdBtn = await getResultFromAPI('/bebidas', 'filterBy', category);
      setTargetButton(innerHTML);
    } else {
      filterdBtn = await getResultFromAPI('/bebidas');
      setTargetButton('');
    }
    setDrinks(filterdBtn);
  };

  async function filterAll() {
    const filterAllApi = await getResultFromAPI('/bebidas');
    setDrinks(filterAllApi);
  }

  return (
    <>
      <Header title="Bebidas" disableBtn={ BOOLEAN_FALSE } />
      <Button
        datatestid="All-category-filter"
        label="All"
        onClick={ filterAll }
      />
      { drinksCategories.map(({ strCategory: category }, index) => (
        <Button
          datatestid={ `${category}-category-filter` }
          label={ category }
          key={ index }
          onClick={ (event) => filterByCategory(category, event) }
        />
      ))}
      { drinks.map((drink, index) => (
        <FoodCard index={ index } food={ drink } key={ index } />
      )) }
      <Footer />
    </>
  );
};

export default Bebidas;
