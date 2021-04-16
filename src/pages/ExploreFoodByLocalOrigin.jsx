import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { infinity } from '../common/svgStore';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';
import { actionThunkMainFoods, actionThunkAreaFoods } from '../redux/actions';
import { requestAreasMeals } from '../services/requestFoodsAPI';

function ExploreFoodByLocalOrigin() {
  const [actualSelect, setActualSelect] = useState('All');
  const [areaOptions, setAreaOptions] = useState([]);
  const mainFoods = useSelector((state) => state.MainRecipes.mainFoods);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const maxArrayLength = 12;
  useEffect(() => {
    dispatch(actionThunkMainFoods());
    async function requestAreas() {
      setIsLoading(true);
      const areas = await requestAreasMeals();
      const areasNames = areas.map((areaObj) => areaObj.strArea);
      setAreaOptions(areasNames);
      setIsLoading(false);
    }
    requestAreas();
  }, [dispatch]);

  const showFoods = () => mainFoods.slice(0, maxArrayLength).map((food, index) => (
    <Link key={ food.idMeal } to={ `/comidas/${food.idMeal}` }>
      <Card
        index={ index }
        id={ food.idMeal }
        imagePath={ food.strMealThumb }
        title={ food.strMeal }
        category=""
      />
    </Link>
  ));

  const showAreasOptions = () => areaOptions.map((areaOption) => (
    <option data-testid={ `${areaOption}-option` } key={ areaOption }>
      {areaOption}
    </option>
  ));

  const handleChange = ({ target: { value } }) => {
    setActualSelect(value);
    setIsLoading(true);
    dispatch(actionThunkAreaFoods(value));
    setIsLoading(false);
  };

  return (
    <>
      <Header label="Explorar Origem" Search={ SearchButton } />
      <br />
      <br />
      <br />
      {isLoading ? (
        <section className="loading-section">
          <img src={ infinity } className="loading-logo" alt="Infinity Logo" />
        </section>
      ) : (
        <section>
          <label htmlFor="drop-origem">
            <select
              className="form-select select-by-origin"
              name="drop-origem"
              id="drop-origem"
              value={ actualSelect }
              data-testid="explore-by-area-dropdown"
              onChange={ handleChange }
            >
              <option value="All" data-testid="All-option">
                All
              </option>
              {showAreasOptions()}
            </select>
          </label>
          <section className="card-section">{showFoods()}</section>
          <br />
          <br />
        </section>
      )}
      <Footer />
    </>
  );
}

export default ExploreFoodByLocalOrigin;
