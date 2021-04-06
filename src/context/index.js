import React, { createContext, useState } from 'react';

import PropTypes from 'prop-types';

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [hideSearchBar, setHideSearchBar] = useState(true);
  const [apiData, setApiData] = useState({});
  const [apiCategories, setApiCategories] = useState([]);
  const [apiName, setApiName] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filteredName, setFilteredName] = useState([]);
  const [RandomFood, setRandomFood] = useState('');

  const filterByCategory = (category) => {
    if (category) return (apiData.filter(({ strCategory }) => strCategory === category));
    return [];
  };

  const filterByName = (name) => {
    if (name) return (apiData.filter(({ strArea }) => strArea === name));
    return [];
  };

  const obj = {
    hideSearchBar: { value: hideSearchBar, set: setHideSearchBar },
    apiData: { value: apiData, set: setApiData },
    RandomFood: { value: RandomFood, set: setRandomFood },
    apiCategories: { value: apiCategories, set: setApiCategories },
    apiName: { value: apiName, set: setApiName },
    filteredRecipes: {
      value: filteredRecipes, set: (cat) => setFilteredRecipes(filterByCategory(cat)),
    },
    filteredName: {
      value: filteredName, set: (nam) => setFilteredName(filterByName(nam)),
    },
  };
  return (
    <Context.Provider value={ obj }>
      { children }
    </Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ContextProvider;
