import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import getResultFromAPI from '../api/getResultFromAPI';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarOrigem() {
  const BOOLEAN_FALSE = false;
  const history = useHistory();
  const [areas, setAreas] = useState([]);
  const [meals, setMeals] = useState([]);

  async function getMealsByArea(option) {
    let mealList = '';
    if (option === 'all') {
      mealList = await getResultFromAPI('/comidas');
    } else {
      mealList = await getResultFromAPI('/comidas', 'filterArea', option);
    }
    setMeals(mealList);
  }

  useEffect(() => {
    async function getAreasFromAPI() {
      const areaList = await getResultFromAPI('/comidas', 'list', 'a=list');
      setAreas(areaList);
    }
    getAreasFromAPI();
    getMealsByArea('all');
  }, []);

  function handleChange(e) {
    getMealsByArea(e.target.value);
  }

  return (
    <div>
      <Header title="Explorar Origem" disableBtn={ BOOLEAN_FALSE } />
      <select data-testid="explore-by-area-dropdown" onChange={ handleChange }>
        <option data-testid="All-option" value="all">All</option>
        { areas.map((data, index) => (
          <option
            value={ data.strArea }
            data-testid={ `${data.strArea}-option` }
            key={ index }
          >
            { data.strArea }
          </option>
        ))}
      </select>
      { meals.map((meal, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ meal.strMeal }>
          <input
            type="image"
            data-testid={ `${index}-card-img` }
            src={ meal.strMealThumb }
            alt="comida"
            width="100%"
            onClick={ () => history.push(`../../comidas/${meal.idMeal}`) }
          />
          <p data-testid={ `${index}-card-name` }>{ meal.strMeal }</p>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default ExplorarOrigem;
