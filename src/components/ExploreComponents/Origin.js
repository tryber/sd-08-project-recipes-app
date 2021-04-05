import React, { useEffect, useState } from 'react';
import { fetchAreas, fetchMealsByArea } from '../../services/API';

import Card from '../cards/MealCard';

export default function Origin() {
  const [areas, setAreas] = useState([]);
  const [areaSelected, setAreaSelected] = useState('All');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function getAreas() {
      const resultAreas = await fetchAreas();
      setAreas(resultAreas);
    }
    getAreas();
  }, []);

  useEffect(() => {
    async function getRecipes() {
      const resultRecipes = await fetchMealsByArea(areaSelected);
      setRecipes(resultRecipes);
    }
    getRecipes();
  }, [areaSelected]);

  return (
    <main>
      <section>
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ (e) => setAreaSelected(e.target.value) }
        >
          {areas.map((area, index) => (
            <option
              key={ index }
              data-testid={ `${area}-option` }
            >
              {area}
            </option>
          ))}
        </select>
      </section>
      {recipes
        .map((meal, index) => (<Card
          key={ meal.idMeal }
          data={ { meal, index, recipeCard: '-recipe-card' } }
        />))}
    </main>
  );
}
