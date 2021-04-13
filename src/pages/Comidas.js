import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardComida from '../components/CardComida';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { getCategoryFoods, getFoodCategory } from '../services/API';

export default function Comidas() {
  const { data, foodRandom } = useContext(RecipesContext);
  const [card, setCard] = useState(false);
  const [listFoodCategories, setListFoodCategories] = useState([]);
  const [arrayOfFoodCategories, setArrayOfFoodCategories] = useState([]);
  const [categoryName, setCategoryName] = useState(undefined);
  const LIMITER = 12;
  const FIVE = 5;

  useEffect(() => {
    const getListCategories = async () => {
      const listFoodCategory = await getCategoryFoods();
      listFoodCategory.length = FIVE;
      setListFoodCategories(listFoodCategory);
    };
    getListCategories();
  }, []);

  useEffect(() => {
    foodRandom();
    setCard(true);
  }, []);

  const handleCLickFood = async ({ target: { value } }) => {
    if (categoryName === undefined) {
      setCard(true);
      setArrayOfFoodCategories(await getFoodCategory(value));
      setCategoryName(value);
    } else if (categoryName === value) {
      setArrayOfFoodCategories(await foodRandom());
      setCard(true);
      setCategoryName(undefined);
    }
  };

  const setsCategory = async () => {
    setCard(true);
    setArrayOfFoodCategories(await foodRandom());
  };

  useEffect(() => {
    setArrayOfFoodCategories(data.food);
    setCard(true);
  }, [data]);

  return (
    <div>
      <Header pageTitle="Comidas" />
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => setsCategory() }
        >
          All
        </button>
        {
          card && listFoodCategories.map((item) => (
            <button
              type="button"
              key={ item.strCategory }
              data-testid={ `${item.strCategory}-category-filter` }
              value={ item.strCategory }
              onClick={ (e) => handleCLickFood(e) }
            >
              {item.strCategory}
            </button>))
        }
      </div>
      <section>
        { card && arrayOfFoodCategories.map((f, i) => {
          const { idMeal } = f;
          return (i < LIMITER) && (
            <Link to={ `/comidas/${idMeal}` }>
              <CardComida
                key={ idMeal }
                comida={ f }
                id={ i }
              />
            </Link>
          );
        }) }
      </section>
      <Footer />
    </div>
  );
}
