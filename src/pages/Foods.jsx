import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';
import Card from '../components/Card';
import Footer from '../components/Footer';
import { actionThunkMainFoods } from '../redux/actions';
import CategoriesContainer from '../components/CategoriesContainer';

import { infinity } from '../common/svgStore';

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
  }, []);

  const mapCards = (array) => (
    <section className="card-item">
      {array.map((food, index) => (
        <Card
          index={ index }
          key={ food.idMeal }
          id={ food.idMeal }
          imagePath={ food.strMealThumb }
          title={ food.strMeal }
          category="food"
          subCategory={ food.strCategory }
        />
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
      {isLoading ? (
        <section className="loading-section">
          <img src={ infinity } className="loading-logo" alt="Infinity Logo" />
        </section>
      ) : (
        <div>
          <Header
            label="Comidas"
            Search={ SearchButton }
            page="Comidas"
          />
          <main className="main-container">
            <CategoriesContainer page="Comidas" />
            <div className="card-food">
              {showCards()}
            </div>
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Foods;
