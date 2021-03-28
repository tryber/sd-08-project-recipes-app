import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SearchButton from '../components/SearchButton';
import Card from '../components/Card';

import { actionThunkMainDrinks } from '../redux/actions';
import CategoriesContainer from '../components/CategoriesContainer';

import { infinity } from '../constants/Icons';
import Layout from '../components/Layout';

function Drinks() {
  const MAX_ARRAY_SIZE = 12;
  const drinks = useSelector((state) => state.FilteredRecipes.drinks);
  const mainDrinks = useSelector((state) => state.MainRecipes.mainDrinks);
  const isLoading = useSelector((state) => state.Loading.isLoading);
  const dispatch = useDispatch();
  const drinksFilterCategories = useSelector(
    (state) => state.FilterByCategory.drinksFilterCategories,
  );

  useEffect(() => {
    dispatch(actionThunkMainDrinks());
  }, []);

  const mapCards = (array) => (
    <section className="card-item">
      {array.map((drink, index) => (
        <Card
          index={ index }
          key={ drink.idDrink }
          id={ drink.idDrink }
          imagePath={ drink.strDrinkThumb }
          title={ drink.strDrink }
          category="drink"
          subCategory={ drink.strCategory }
        />
      ))}
    </section>
  );
  const showCards = () => {
    let drinksToMap = [];
    if (drinks.length === 0 && drinksFilterCategories.length === 0) {
      drinksToMap = [...mainDrinks];
    } else if (drinksFilterCategories.length === 0) {
      drinksToMap = [...drinks];
    } else {
      drinksToMap = [...drinksFilterCategories];
    }
    if (drinksToMap.length === 1 && drinks.length !== 0) {
      const id = drinksToMap[0].idDrink;
      const path = `/bebidas/${id}`;
      return <Redirect to={ path } />;
    }
    if (drinksToMap.length > MAX_ARRAY_SIZE) {
      const subArray = drinksToMap.splice(0, MAX_ARRAY_SIZE);
      return mapCards(subArray);
    }
    return mapCards(drinksToMap);
  };
  return (
    <Layout
      label="Bebidas"
      Search={ SearchButton }
      page="Bebidas"
    >
      <section className="content">
        {isLoading ? (
          <section className="loading">
            <img src={ infinity } className="loading-logo" alt="Infinity Logo" />
          </section>
        ) : (
          <section className="drinks">
            <CategoriesContainer page="Bebidas" />
            <div className="card-food">
              {showCards()}
            </div>
          </section>
        )}
      </section>
    </Layout>
  );
}

export default Drinks;
