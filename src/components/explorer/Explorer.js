import React from 'react';
import { useHistory } from 'react-router';

const Explorer = () => {
  const history = useHistory();
  const RedirectPages = (path) => {
    history.push(path);
  };

  return (
    <>
      <button
        type="button"
        data-testid="explore-food"
        onClick={ () => RedirectPages('/explorar/comidas') }
      >
        Explorar Comidas
      </button>

      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => RedirectPages('/explorar/bebidas') }
      >
        Explorar Bebidas
      </button>
    </>
  );
};

export default Explorer;
