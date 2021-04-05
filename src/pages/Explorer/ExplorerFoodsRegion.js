import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../../components/Card';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { showCompleteLists, filterArea } from '../../services/api';

function ExplorerFoodsRegion() {
  const STOP_INDEX = 11;
  const history = useHistory();
  const [areaList, setAreaList] = useState([]);
  const [selectedArea, setSelectedArea] = useState('American');
  const [mealList, setMealList] = useState([]);
  useEffect(() => {
    async function setTheList() {
      const requestAreaList = await showCompleteLists('area', 'Foods');
      setAreaList(requestAreaList.meals);
    } setTheList();
  }, []);

  useEffect(() => {
    async function setTheMealList() {
      const requestMealList = await filterArea(selectedArea, 'Foods');
      setMealList(requestMealList.meals);
    } setTheMealList();
  }, [selectedArea]);

  const handleChange = ({ target }) => { setSelectedArea(target.value); };
  const areaOptions = areaList.map(({ strArea }) => (

    <option
      key={ strArea }
      data-testid={ `${strArea}-option` }
      value={ strArea }
    >
      {strArea}
    </option>));
  return (
    <div>
      <Header name="Explorar Origem" icon="true" currentPage="Foods" />
      <label htmlFor="dropdown">
        Origem:
        <select
          id="dropdown"
          onChange={ handleChange }
          data-testid="explore-by-area-dropdown"
        >
          <option
            key="All"
            data-testid="All-option"
            value="All"
          >
            All
          </option>
          {areaOptions}
        </select>
      </label>
      {mealList && mealList.filter((meal, index) => index <= STOP_INDEX)
        .map((item, index) => (
          <Card
            key={ item.idMeal }
            id={ item.idMeal }
            name={ item.strMeal }
            img={ item.strMealThumb }
            index={ index }
            onClick={ () => history.push(`/comidas/${item.idMeal}`) }
          />
        ))}
      <Footer />
    </div>
  );
}

export default ExplorerFoodsRegion;
