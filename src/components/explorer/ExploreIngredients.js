import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { ingredients } from '../../services';
import LariContext from '../../context/Context';

const Teste = ({ type }) => {
  const { setNameIngredient } = useContext(LariContext);

  const history = useHistory();

  const [arrayOfIngredients, setArrayOfIngredients] = useState([]);

  const TOTAL_CARDS = 12;

  useEffect(() => {
    async function responseAPI() {
      const response = await ingredients(type);
      if (type === 'bebidas') {
        return setArrayOfIngredients(response.drinks);
      }
      return setArrayOfIngredients(response.meals);
    }
    responseAPI();
  }, [type]);

  const redirect = (name, path) => {
    // console.log(name);
    setNameIngredient(name);
    history.push(path);
  };

  return (
    <div>
      <ul>
        {
          arrayOfIngredients.slice(0, TOTAL_CARDS).map((ingredient, index) => {
            const name = ingredient[type === 'bebidas'
              ? 'strIngredient1' : 'strIngredient'];
            const linkAPI = type === 'bebidas' ? 'thecocktaildb' : 'themealdb';
            return (
              <button
                type="button"
                key={ name }
                data-testid={ `${index}-ingredient-card` }
                onClick={ () => redirect(name, `/${type}`) }
              >
                <p data-testid={ `${index}-card-name` }>{name}</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.${linkAPI}.com/images/ingredients/${name}-Small.png` }
                  alt={ `${name}` }
                />
              </button>
            );
          })
        }
      </ul>
    </div>
  );
};

Teste.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Teste;
