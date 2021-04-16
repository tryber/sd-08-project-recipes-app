import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';
import Card from '../components/Card';
import Footer from '../components/Footer';
import { actionThunkMainFoods } from '../redux/actions';
import CategoriesContainer from '../components/CategoriesContainer';

import { infinity } from '../common/svgStore';
import '../styles/loading.css';

function Foods() {
  const MAX_ARRAY_SIZE = 12;
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.Loading.isLoading);
  const foods = useSelector((state) => state.FilteredRecipes.foods);
  const mainFoods = useSelector((state) => state.MainRecipes.mainFoods);
  const foodsFilterCategories = useSelector(
    (state) => state.FilterByCategory.foodsFilterCategories,
  );

  // const requestMainFoods = () => {
  //   dispatch(actionThunkMainFoods());
  // };

  useEffect(() => {
    dispatch(actionThunkMainFoods());
  }, [dispatch]);

  const mapCards = (array) => (
    <section className="card-item">
      {array.map((food, index) => (
        <Link key={ food.idMeal } to={ `/comidas/${food.idMeal}` }>
          <Card
            index={ index }
            id={ food.idMeal }
            imagePath={ food.strMealThumb }
            title={ food.strMeal }
            category={ food.strCategory }
          />
        </Link>
      ))}
    </section>
  );

  const showCards = () => {
    let foodsToMap = [];
    if (foods.length === 0 && foodsFilterCategories.length === 0) {
      foodsToMap = [...mainFoods];
    } else if (foodsFilterCategories.length === 0) {
      foodsToMap = [...foods];
    } else {
      foodsToMap = [...foodsFilterCategories];
    }
    if (foodsToMap.length === 1 && foods.length !== 0) {
      const id = foodsToMap[0].idMeal;
      const path = `/comidas/${id}`;
      return <Redirect to={ path } />;
    }
    if (foodsToMap.length > MAX_ARRAY_SIZE) {
      const subArray = foodsToMap.splice(0, MAX_ARRAY_SIZE);
      return mapCards(subArray);
    }
    return mapCards(foodsToMap);
  };
  return (
    <div className="div-foods">
      <Header label="Comidas" Search={ SearchButton } page="Comidas" />
      <br />
      <br />
      <br />
      {isLoading ? (
        <section className="loading-section">
          <img src={ infinity } className="loading-logo" alt="Infinity Logo" />
        </section>
      ) : (
        <>
          <CategoriesContainer page="Comidas" />
          <div className="card-section">
            {showCards()}
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default Foods;
