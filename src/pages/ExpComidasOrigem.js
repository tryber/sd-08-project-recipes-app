import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { requestMealsByAreaList,
  requestAreaList,
  requestRecipesList } from '../services/apiRequests';
import HeaderWithSearch from '../components/HeaderWithSearch';
import Footer from '../components/Footer';

function ExplorarComidasOrigem() {
  const history = useHistory();
  const MIN_INDEX = 0;
  const MAX_INDEX = 12;
  const [areaList, setAreaList] = useState([]);
  const [mealsByArea, setMealsByArea] = useState([]);
  const [mealsList, setMealsList] = useState(['American']);

  useEffect(() => {
    const requestArea = async () => {
      const listArea = await requestAreaList();
      setAreaList(listArea);
    };
    const requestMealsArea = async () => {
      const listMealsByArea = await requestMealsByAreaList(mealsList);
      setMealsByArea(listMealsByArea);
    };
    const requestAllMeals = async () => {
      const listAllMeals = await requestRecipesList();
      setMealsByArea(listAllMeals);
    };
    requestArea();
    if (mealsList === 'all') {
      requestAllMeals();
    } else requestMealsArea();
  }, [mealsList]);

  if (!mealsList) return <span>Loading...</span>;

  return (
    <div>
      <HeaderWithSearch />
      <div className="select-container">
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ ({ target }) => setMealsList(target.value) }
          className="select-origin"
        >
          <option value="all" key="all" data-testid="All-option">All</option>
          {
            areaList.map((area) => (
              <option
                key={ area.strArea }
                value={ area.strArea }
                data-testid={ `${area.strArea}-option` }
              >
                { area.strArea }
              </option>
            ))
          }
        </select>
      </div>
      <div>
        {
          mealsByArea.slice(MIN_INDEX, MAX_INDEX)
            .map((idMeal, index) => (
              <div
                className="recipe-card"
                key={ idMeal.idMeal }
                data-testid={ `${index}-recipe-card` }
              >
                <input
                  type="image"
                  className="card-image"
                  src={ idMeal.strMealThumb }
                  alt={ idMeal.strMeal }
                  data-testid={ `${index}-card-img` }
                  onClick={ () => history.push(`/comidas/${idMeal.idMeal}`) }
                />
                <p
                  data-testid={ `${index}-card-name` }
                  className="recipe-card-title"
                >
                  { idMeal.strMeal }
                </p>
              </div>
            ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarComidasOrigem;
