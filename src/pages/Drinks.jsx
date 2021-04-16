import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';
import Card from '../components/Card';
import '../styles/card.css';
import Footer from '../components/Footer';
import { actionThunkMainDrinks } from '../redux/actions';
import CategoriesContainer from '../components/CategoriesContainer';
import { infinity } from '../common/svgStore';

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
  }, [dispatch]);

  const mapCards = (array) => (
    <section className="card-item">
      {array.map((drink, index) => (
        <Link to={ `/bebidas/${drink.idDrink}` } key={ drink.idDrink }>
          <Card
            index={ index }
            id={ drink.idDrink }
            imagePath={ drink.strDrinkThumb }
            title={ drink.strDrink }
            category={ drink.strCategory }
          />
        </Link>
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
    <div className="div-foods">
      <Header label="Bebidas" Search={ SearchButton } page="Bebidas" />
      <br />
      <br />
      <br />
      {isLoading ? (
        <section className="loading-section">
          <img src={ infinity } className="loading-logo" alt="Infinity Logo" />
        </section>
      ) : (
        <>
          <CategoriesContainer page="Bebidas" />
          <div className="card-section">
            {showCards()}
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default Drinks;
