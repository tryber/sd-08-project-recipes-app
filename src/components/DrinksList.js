import React, { useContext, useEffect, useState } from 'react';
import DrinksCard from './DrinksCard';
import {
  requestDrinksList,
  requestDrinksByIngredient,
  requestDrinksByNameOrFirstLetter,
  requestDrinksByCategorie,
} from '../services/apiRequests';
import Context from '../context/Context';

function DrinksList() {
  const { searchParams, inputValue, setIsLoading } = useContext(Context);
  const [allDrinks, setAllDrinks] = useState([]);
  const MAX_INDEX = 11;
  useEffect(() => {
    async function requestDrinks(searchFilter, value) {
      setIsLoading(true);
      if (searchFilter === '') {
        const drinks = await requestDrinksList();
        setAllDrinks(drinks);
      } else if (searchFilter === 'ingrediente') {
        const drinks = await requestDrinksByIngredient(value);
        setAllDrinks(drinks);
      } else if (searchFilter === 'primeira-letra') {
        const drinks = await requestDrinksByNameOrFirstLetter('f', value);
        setAllDrinks(drinks);
      } else if (searchFilter === 'categorie') {
        const drinks = await requestDrinksByCategorie(value);
        setAllDrinks(drinks);
      } else {
        const drinks = await requestDrinksByNameOrFirstLetter('s', value);
        setAllDrinks(drinks);
      }
      setIsLoading(false);
    }
    requestDrinks(searchParams, inputValue);
  }, [searchParams, inputValue, setIsLoading]);
  return (
    <main className="recipes-container">
      {
        allDrinks !== null || undefined
          ? allDrinks.map((drink, index) => {
            if (index <= MAX_INDEX) {
              return (
                <DrinksCard
                  key={ drink.idDrink }
                  drink={ drink }
                  index={ index }
                  id={ drink.idDrink }
                />
              );
            }
            return '';
          })
          : alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
      }
    </main>
  );
}

export default DrinksList;
