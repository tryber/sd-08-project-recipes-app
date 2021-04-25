import React from 'react';
import PropTypes from 'prop-types';
import RecipiesContext from './RecipiesContext';

const Provider = ({ children }) => {
  const context = {
    value: '',
  };

  return (
    <RecipiesContext.Provider value={ context }>
      {children}
    </RecipiesContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
