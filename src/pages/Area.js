import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CardComida from '../components/CardComida';
import { getAreas, getFoodRandom, getFoodsByArea } from '../services/API';

function Area() {
  const [selectVal, setSelectVal] = useState('');
  const [areas, setAreas] = useState([]);
  const [foods, setFoods] = useState([]);
  const [haveArea, setHaveArea] = useState(false);
  const [haveFoods, setHaveFoods] = useState(false);
  const LIMITER = 12;

  useEffect(() => {
    (async () => {
      const a = await getAreas();
      const f = await getFoodRandom();
      setFoods(f);
      setHaveFoods(true);
      setAreas(a.meals);
      setHaveArea(true);
    })();
  }, []);

  const handleClick = async (e) => {
    const { target } = e;
    const { value } = target;
    setSelectVal(value);
    if (value === 'All') {
      const food = await getFoodRandom();
      setFoods(food);
      setHaveFoods(true);
    } else {
      const food = await getFoodsByArea(e.target.value);
      setFoods(food.meals);
      setHaveFoods(true);
      console.log(food.meals);
    }
  };

  return (
    <section>
      <Header pageTitle="Explorar Área" />
      <select
        id="areaDropdown"
        value={ selectVal }
        onChange={ (e) => handleClick(e) }
        data-testid="explore-by-area-dropdown"
      >
        <option value="All" data-testid="All-option">All</option>
        { haveArea && areas.map(({ strArea }, i) => (
          <option
            key={ i }
            data-testid={ `${strArea}-option` }
            name={ strArea }
          >
            { strArea }
          </option>
        )) }
      </select>
      { haveFoods && foods.map((meal, i) => {
        const { idMeal } = meal;
        return i < LIMITER && (
          <Link to={ `/comidas/${idMeal}` }>
            <CardComida
              key={ idMeal }
              comida={ meal }
              id={ i }
            />
          </Link>
        );
      }) }
      <Footer />
    </section>
  );
}

export default Area;
