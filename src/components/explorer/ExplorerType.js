import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchSurprised } from '../../services';

const ExplorerType = ({ showAreaButton = true, type }) => {
  const history = useHistory();
  const RedirectPages = (path) => {
    console.log(path);
    history.push(path);
  };

  async function redirectSurprise() {
    const responseAPI = await fetchSurprised(type);
    if (type === 'comidas') {
      RedirectPages(`/${type}/${responseAPI.meals[0].idMeal}`);
    } else {
      RedirectPages(`/${type}/${responseAPI.drinks[0].idDrink}`);
    }
  }

  return (
    <>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => RedirectPages(`/explorar/${type}/ingredientes`) }
      >
        Por Ingredientes
      </button>
      {
        showAreaButton && (
          <button
            type="button"
            data-testid="explore-by-area"
            onClick={ () => RedirectPages('/explorar/comidas/area') }
          >
            Por Local de Origem
          </button>
        )
      }

      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => redirectSurprise() }
      >
        Me Surpreenda!
      </button>
    </>
  );
};

ExplorerType.propTypes = {
  showAreaButton: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export default ExplorerType;
