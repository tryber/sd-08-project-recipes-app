import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchListArea, fetchFoodsAreaName, fetchAPIFood } from '../helpers/index';

function ExploreByArea() {
  const [foods, setFoods] = useState([]);
  const [apiListFood, setApiListFood] = useState([]);
  const [country, setCountry] = useState('');

  const getApiCategoriesFood = async () => {
    setApiListFood(await fetchListArea());
    setFoods(await fetchAPIFood());
  };

  const getFoodsArea = async () => {
    if (country === 'all') {
      setFoods(await fetchAPIFood());
    } else {
      setFoods(await fetchFoodsAreaName(country));
    }
  };

  useEffect(() => {
    getApiCategoriesFood();
  }, []);

  useEffect(() => {
    getFoodsArea();
  }, [country]);

  const zero = 0;
  const maxMeals = 12;

  return (
    <div>
      <Header />
      {apiListFood !== undefined && apiListFood !== null ? (
        <div>
          <select
            data-testid="explore-by-area-dropdown"
            value={ country }
            onChange={ (e) => setCountry(e.target.value) }
          >
            <option key="all" value="all" data-testid="All-option">All</option>
            {apiListFood
              .map((item) => (
                <option
                  key={ item.strArea }
                  value={ item.strArea }
                  data-testid={ `${item.strArea}-option` }
                >
                  {item.strArea}
                </option>))}
          </select>
        </div>
      ) : []}
      <div>
        {foods !== undefined && foods !== null ? (
          foods.map((item, index) => (
            <Link
              to={ `/comidas/${item.idMeal}` }
              key={ item.strMeal }
              style={ { width: '8rem' } }
            >
              <div
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ item.strMealThumb }
                  alt="Imagem de capa do card"
                />
                <div>
                  <p
                    data-testid={ `${index}-card-name` }
                  >
                    { item.strMeal }
                  </p>
                </div>
              </div>
            </Link>
          )).slice(zero, maxMeals)
        ) : (
          []
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreByArea;
