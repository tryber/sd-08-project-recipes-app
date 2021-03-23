import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LariContext from './Context';
import { headerSearch } from '../services';

const Provider = ({ children }) => {
  const [food, setFood] = useState([]);
  const handleHeaderSearch = async (search, type) => {
    const results = await headerSearch(search, type);
    setFood(results ? results.meals : []);
  };
  const context = { handleHeaderSearch, food };

  return (
    <div>
      <LariContext.Provider value={ context }>
        {children}
      </LariContext.Provider>
    </div>
  );
};
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
