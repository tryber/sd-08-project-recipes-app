import React, { useEffect, useState } from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Card from '../components/Card';
import { fetchMealsByArea, fetchAreas } from '../services';

const MAX_FOODS_TO_RENDER = 12;

export default function ExplorarArea() {
  const [area, setArea] = useState('');
  const [foodsByArea, setFoodsByArea] = useState([]);
  const [availableAreas, setAvailableAreas] = useState([]);

  useEffect(() => {
    const getAreas = async () => {
      const areasRequest = await fetchAreas();
      setAvailableAreas(['All', ...areasRequest]);
    };

    getAreas();
  }, []);

  useEffect(() => {
    const getMealsByArea = async () => {
      const mealsRequest = await fetchMealsByArea(area);
      setFoodsByArea(mealsRequest);
    };

    getMealsByArea();
  }, [area]);

  return (
    <div>
      <Header title="Explorar Origem" />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={
          ({ target }) => setArea(target.value === 'All' ? '' : target.value)
        }
      >
        {
          availableAreas.map((avArea) => (
            <option key={ avArea } data-testid={ `${avArea}-option` }>{avArea}</option>
          ))
        }
      </select>
      {
        foodsByArea.slice(0, MAX_FOODS_TO_RENDER).map((meal, index) => (
          <Card
            key={ meal.idMeal }
            id={ meal.idMeal }
            index={ index }
            name={ meal.strMeal }
            thumbnail={ meal.strMealThumb }
            isFood
          />
        ))
      }
      <Footer />
    </div>
  );
}
