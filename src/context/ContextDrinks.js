import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  getDrinkByIngredients,
  getDrinkByName,
  getDrinkByFirstLetter,
  getDrinksCategories,
  getDrinksByCategory,
} from '../services/getAPIs';

export const DataDrinksContext = createContext();

function DrinksContext(props) {
  const history = useHistory();
  const [ingredientSearchRadioDrink, setIngredientSearchRadioDrink] = useState(
    false,
  );
  const [nameSearchRadioDrink, setNameSearchRadioDrink] = useState(false);
  const [
    firstLetterSearchRadioDrink,
    setFirstLetterSearchRadioDrink,
  ] = useState(false);
  const [drinks, setDrinks] = useState([]);
  const [categoryDrinks, setCategoryDrinks] = useState([]);
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);

  const [searchInputDrink, setSearchInputDrink] = useState([]);
  const myCustomAlert = (text) => {
    const myAlert = window.alert;
    myAlert(text);
  };

  const handleClickSearchDrink = useCallback(async () => {
    if (nameSearchRadioDrink) {
      const res = await getDrinkByName(searchInputDrink);
      if (res === null) {
        myCustomAlert(
          'Sinto muito, não encontramos nenhuma receita para esses filtros.',
        );
        return null;
      }
      if (res.length === 1) {
        const onlyDrink = [res[0]];
        onlyDrink.map((item) => history.push(`/bebidas/${item.idDrink}`));
      }
      setDrinks(res);
    }
    if (!!firstLetterSearchRadioDrink && searchInputDrink.length === 1) {
      const res = await getDrinkByFirstLetter(searchInputDrink);
      setDrinks(res);
    }
    if (!!firstLetterSearchRadioDrink && searchInputDrink.length !== 1) {
      myCustomAlert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (ingredientSearchRadioDrink) {
      const res = await getDrinkByIngredients(searchInputDrink);
      setDrinks(res);
    }
  }, [
    nameSearchRadioDrink,
    firstLetterSearchRadioDrink,
    searchInputDrink,
    ingredientSearchRadioDrink,
    history,
  ]);

  useEffect(() => {
    async function fetchDataDrinks() {
      const initialContentDrink = await getDrinkByName('');
      setDrinks(initialContentDrink);
    }
    fetchDataDrinks();
    async function fetchCategoriesDrinks() {
      const initialCategoriesDrinks = await getDrinksCategories();
      setCategoriesDrinks(initialCategoriesDrinks);
    }
    fetchCategoriesDrinks();
  }, []);

  const handleSearchByIngredientsDrink = () => {
    setIngredientSearchRadioDrink(!ingredientSearchRadioDrink);
    if (nameSearchRadioDrink) setNameSearchRadioDrink(!nameSearchRadioDrink);
    if (firstLetterSearchRadioDrink) {
      setFirstLetterSearchRadioDrink(!firstLetterSearchRadioDrink);
    }
  };
  useEffect(() => {
    if (
      [
        ingredientSearchRadioDrink,
        nameSearchRadioDrink,
        firstLetterSearchRadioDrink,
      ].includes(true)
    ) {
      handleClickSearchDrink();
    }
  }, [
    firstLetterSearchRadioDrink,
    handleClickSearchDrink,
    ingredientSearchRadioDrink,
    nameSearchRadioDrink,
  ]);
  const handleSearchByNameDrink = () => {
    setNameSearchRadioDrink(!nameSearchRadioDrink);
    if (ingredientSearchRadioDrink) {
      setIngredientSearchRadioDrink(!ingredientSearchRadioDrink);
    }
    if (firstLetterSearchRadioDrink) {
      setFirstLetterSearchRadioDrink(!firstLetterSearchRadioDrink);
    }
  };

  const handleSearchByFirstLetterDrink = () => {
    setFirstLetterSearchRadioDrink(!firstLetterSearchRadioDrink);
    if (ingredientSearchRadioDrink) {
      setIngredientSearchRadioDrink(!ingredientSearchRadioDrink);
    }
  };

  const handleChangeSearchDrink = (e) => {
    setSearchInputDrink(e);
  };

  const handleByCategoryDrink = async (category) => {
    if (category === categoryDrinks) {
      const resetFilter = await getDrinkByName('');
      setDrinks(resetFilter);
    } else if (category === 'all') {
      const drinksByCategory = await getDrinkByName('');
      setDrinks(drinksByCategory);
      setCategoryDrinks(category);
    } else {
      const drinksByCategory = await getDrinksByCategory(category);
      setDrinks(drinksByCategory);
      setCategoryDrinks(category);
    }
  };

  const { children } = props;
  return (
    <div>
      <DataDrinksContext.Provider
        value={ {
          handleChangeSearchDrink,
          setSearchInputDrink,
          handleSearchByIngredientsDrink,
          handleSearchByFirstLetterDrink,
          handleSearchByNameDrink,
          handleClickSearchDrink,
          handleByCategoryDrink,
          nameSearchRadioDrink,
          ingredientSearchRadioDrink,
          firstLetterSearchRadioDrink,
          searchInputDrink,
          drinks,
          categoryDrinks,
          categoriesDrinks,
        } }
      >
        {children}
      </DataDrinksContext.Provider>
    </div>
  );
}
export default DrinksContext;
DrinksContext.propTypes = {
  children: PropTypes.node.isRequired,
};
