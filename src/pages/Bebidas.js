import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import LariContext from '../context/Context';
import Card from '../components/Card';
import { categoryDrink, seachDrinkByCategory } from '../services';

const Drinks = () => {
  const MAX_RECIPES = 12;
  const MAX_CATEGORY = 5;
  const { recipesFetch,
    drink,
    nameIngredient,
    setNameIngredient,
    handleHeaderSearch } = useContext(LariContext);
  const [mapCards, setMapCards] = useState([]);
  const [category, setCategory] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('All');

  useEffect(() => {
    setFilteredDrinks(drink);
  }, [drink]);

  useEffect(() => {
    function fetchFetch() {
      recipesFetch(false);
    }
    function fetchCategory() {
      // console.log('fetchCategory');
      categoryDrink()
        .then((response) => setCategory(response));
    }
    fetchCategory();
    fetchFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const mapDrinks = () => (
      setMapCards(
        filteredDrinks.map((beverage, index) => {
          if (index < MAX_RECIPES) {
            return (
              <Card
                key={ beverage.idDrink }
                id={ beverage.idDrink }
                index={ index }
                name={ beverage.strDrink }
                thumbnail={ beverage.strDrinkThumb }
                isFood={ false }
              />
            );
          }
          return '';
        }),
      )
    );
    mapDrinks();
  }, [filteredDrinks]);

  const fetchDrinkByCategory = async (cat) => {
    if (currentCategory === cat) {
      setFilteredDrinks(drink);
      setCurrentCategory('All');
    } else {
      const result = await seachDrinkByCategory(cat);
      setFilteredDrinks(result);
      setCurrentCategory(cat);
    }
  };

  const mapCategory = () => category.slice(0, MAX_CATEGORY).map((drinks, index) => (
    <label key={ drinks.strCategory } htmlFor={ drinks.strCategory }>
      {drinks.strCategory}
      <input
        key={ index }
        type="radio"
        data-testid={ `${drinks.strCategory}-category-filter` }
        onClick={ () => fetchDrinkByCategory(drinks.strCategory) }
        checked={ currentCategory === drinks.strCategory }
      />
    </label>
  ));
  useEffect(() => {
    // console.log('useEffect');
    if (nameIngredient) {
      handleHeaderSearch(nameIngredient, 'ingredients', 'Bebidas');
      setNameIngredient('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header title="Bebidas" />
      {mapCategory()}
      <label htmlFor="All">
        All
        <input
          type="radio"
          data-testid="All-category-filter"
          onClick={ () => setFilteredDrinks(drink) }
          checked={ currentCategory === 'All' }
        />
      </label>
      {mapCards}
      <Footer />
    </div>
  );
};

export default Drinks;
