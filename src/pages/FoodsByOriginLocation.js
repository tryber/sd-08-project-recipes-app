import React, { useEffect, useState, useCallback } from 'react';
import './FoodsByOriginLocation.css';
import Footer from '../components/Footer';
import HeaderSearchBar from '../components/HeaderSearchBar';
import RecipeCard from '../components/RecipeCard';

function FoodsByOringLocation() {
  const [mealsArea, setMealsArea] = useState([{ strArea: 'All' }]);
  const [mealsForArea, setMealsForArea] = useState([]);
  const TWELVE = 12;

  const fetchMealsArea = useCallback(async () => {
    const Url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const response = await fetch(Url);
    const results = await response.json();
    setMealsArea([...mealsArea, ...results.meals]);
  }, []);

  const fetchSelectedMealsForArea = async (selectedArea) => {
    const Url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`;
    const response = await fetch(Url);
    const results = await response.json();
    setMealsForArea(results.meals);
  };

  const initialFoods = async () => {
    const foods = await fetchSelectedMealsForArea();
    setMealsForArea(foods.meals);
  };

  const areaSelectedOption = ({ target: { value } }) => {
    if (value === 'All') {
      initialFoods();
    }
    fetchSelectedMealsForArea(value);
  };

  useEffect(() => {
    fetchMealsArea();
    fetchSelectedMealsForArea();
  }, [fetchMealsArea]);

  return (
    <div className="container">
      <HeaderSearchBar />
      <select
        className="explore-dropdown"
        data-testid="explore-by-area-dropdown"
        onChange={ areaSelectedOption }
      >
        {
          mealsArea
            .map((area, index) => (
              <option
                key={ index }
                value={ area.strArea }
                data-testid={ `${area.strArea}-option` }
              >
                { area.strArea }
              </option>
            ))
        }
      </select>
      <div className="cards-container">
        {
          mealsForArea && mealsForArea.filter((_, index) => index < TWELVE)
            .map((meal, index) => (
              <RecipeCard
                key={ index }
                id={ index }
                meal={ meal }
              />
            ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default FoodsByOringLocation;
