import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const PageProgress = createContext();

function ContextProgress({ children }) {
  const [recipeCompleted, setRecipeCompleted] = useState(true);

  const values = () => ({
    recipeCompleted,
    setRecipeCompleted,
  });

  return (
    <PageProgress.Provider value={ values() }>
      { children }
    </PageProgress.Provider>
  );
}

ContextProgress.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProgress;
