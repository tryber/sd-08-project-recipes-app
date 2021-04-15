import React, { useEffect, useState } from 'react';

import { getListAllAreaOfTheFood, getFoodByArea,
  requestMealRecipe } from '../../../../services/API';

import Header from '../../../../components/Header';
import Footer from '../../../../components/footer';
import CardFood from '../../../../components/Card/CardFood';

function ComidaArea() {
  const [area, setArea] = useState([]);
  const [selectedArea, setSelectedArea] = useState('All');
  const [foodByArea, setFoodByArea] = useState([]);

  useEffect(() => {
    getListAllAreaOfTheFood()
      .then(({ meals }) => setArea([{ strArea: 'All' }, ...meals]));
  }, []);

  const handleSelectedArea = ({ target: { value } }) => setSelectedArea(value);

  useEffect(() => {
    if (selectedArea.includes('All')) {
      requestMealRecipe()
        .then(({ meals }) => setFoodByArea(meals));
    }
    getFoodByArea(selectedArea).then(({ meals }) => setFoodByArea(meals));
  }, [selectedArea]);
  console.log(foodByArea);

  return (
    <>
      <Header>Explorar Origem</Header>
      <select
        data-testid="explore-by-area-dropdown"
        value={ selectedArea }
        onChange={ handleSelectedArea }
      >
        {area.map(({ strArea }, index) => (
          <option
            key={ index }
            value={ strArea }
            data-testid={ `${strArea}-option` }
          >
            {strArea}
          </option>
        ))}
      </select>
      {foodByArea && <CardFood foods={ foodByArea } />}
      <Footer />
    </>
  );
}

export default ComidaArea;
