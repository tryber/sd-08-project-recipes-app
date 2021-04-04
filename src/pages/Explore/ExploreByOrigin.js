import React, { useState, useEffect } from 'react';
import { Header, Footer, RecipeCards } from '../../component';

export default function ExploreByOrigin() {
  const [countryOption, setCountryOption] = useState([{ strArea: 'All' }]);
  const [mealsByCountry, setMealsByCountry] = useState([]);
  const TWELVE = 12;

  const fetchCountries = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const response = await fetch(url);
    const results = await response.json();
    setCountryOption([...countryOption, ...results.meals]);
  };

  const fetchMealsByCountry = async (selectedArea) => {
    const Url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`;
    const response = await fetch(Url);
    const results = await response.json();
    setMealsByCountry(results.meals);
  };

  const initialFoods = async () => {
    const foods = await fetchMealsByCountry();
    setMealsByCountry(foods.meals);
  };
  const areaSelectdOption = ({ target: { value } }) => {
    if (value === 'All') {
      initialFoods();
    }
    fetchMealsByCountry(value);
  };

  useEffect(() => {
    fetchCountries();
    fetchMealsByCountry();
  }, []);

  return (
    <>
      <Header pageTitle="Explorar Origem" />
      <select
        className="explore-dropdown"
        data-testid="explore-by-area-dropdown"
        onChange={ areaSelectdOption }
      >
        {
          countryOption
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
          mealsByCountry && mealsByCountry.filter((_, index) => index < TWELVE)
            .map((recipe, index) => (
              <RecipeCards
                key={ index }
                id={ recipe.idMeal }
                recipe={ recipe }
                index={ index }
                type="Meal"
              />

            ))
        }
      </div>
      <Footer />
    </>
  );
}
