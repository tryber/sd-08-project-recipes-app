import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CardBebida from '../components/CardBebida';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getCategoryDrinks, getDrinkCategory } from '../services/API';
import RecipesContext from '../context/RecipesContext';

export default function Bebidas() {
  const { data, drinkRandom } = useContext(RecipesContext);
  const [card, setCard] = useState(false);
  const [arrayOfDrinksCategories, setArrayOfDrinksCategories] = useState([]);
  const LIMITER = 12;
  const FIVE = 5;
  const [listDrinkCategories, setListDrinkCategories] = useState([]);
  const [categoryName, setCategoryName] = useState(undefined);

  useEffect(() => {
    const getListCategories = async () => {
      const listDrinkCategory = await getCategoryDrinks();
      listDrinkCategory.length = FIVE;
      setListDrinkCategories(listDrinkCategory);
    };
    getListCategories();
  }, []);

  useEffect(() => {
    drinkRandom();
    setCard(true);
  }, []);

  const handleClickDrink = async ({ target: { value } }) => {
    if (categoryName === undefined) {
      setCard(true);
      setArrayOfDrinksCategories(await getDrinkCategory(value));
      setCategoryName(value);
    } else if (categoryName === value) {
      setArrayOfDrinksCategories(await drinkRandom());
      setCard(true);
      setCategoryName(undefined);
    }
  };

  const setsCategory = async () => {
    setCard(true);
    setArrayOfDrinksCategories(await drinkRandom());
  };
  useEffect(() => {
    setArrayOfDrinksCategories(data.drink);
    setCard(true);
  }, [data]);

  return (
    <div>
      <Header pageTitle="Bebidas" />
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => setsCategory() }
        >
          All
        </button>
        {
          card && listDrinkCategories.map((item) => (
            <button
              type="button"
              key={ item.strCategory }
              data-testid={ `${item.strCategory}-category-filter` }
              value={ item.strCategory }
              onClick={ (e) => handleClickDrink(e) }
            >
              {item.strCategory}
            </button>))
        }
      </div>
      <section>
        { card && arrayOfDrinksCategories.map((d, i) => {
          const { idDrink } = d;
          return (i < LIMITER) && (
            <Link to={ `/bebidas/${idDrink}` }>
              <CardBebida
                key={ idDrink }
                bebida={ d }
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
