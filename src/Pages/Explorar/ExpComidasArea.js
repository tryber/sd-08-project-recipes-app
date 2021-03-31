import React, { useContext, useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RecipesList from '../../components/RecipesList';
import RecipeContext from '../../context/RecipeContext';

function ExpComidasArea() {
  const {
    directRequestFood, setFilterByArea,
    setMeals, filterByArea } = useContext(RecipeContext);
  const [areas, setAreas] = useState([]);

  const fetchListArea = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((response) => response.json())
      .then((data) => setAreas(data.meals));
  };

  const filterByAreas = ({ target }) => {
    if (target.value === 'All') {
      directRequestFood();
    } else {
      setFilterByArea(target.value);
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`)
        .then((response) => response.json())
        .then((data) => setMeals(data.meals));
    }
  };

  useEffect(() => {
    directRequestFood();
    fetchListArea();

    return setFilterByArea('All');
  }, []);

  return (
    <div className="comidas-body">
      <Header title="Explorar Origem" />
      <select
        value={ filterByArea }
        data-testid="explore-by-area-dropdown"
        className="dropdown-areas"
        // onChange={ ({ target }) => setFilterByArea(target.value) }
        onChange={ filterByAreas }
      >
        <option data-testid="All-option">All</option>
        {areas.map(({ strArea }, i) => (
          <option key={ i } data-testid={ `${strArea}-option` }>{strArea}</option>
        ))}
      </select>
      <RecipesList />
      <Footer />
    </div>
  );
}

export default ExpComidasArea;
