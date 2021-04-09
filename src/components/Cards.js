import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import '../styles/Cards.css';

function Cards({ title }) {
  const history = useHistory();
  const {
    type,
    comidas,
    bebidas,
    setType,
    setRecipe,
  } = useContext(MyContext);
  const LIMIT = 11;
  let array = [];

  if (title === 'Comidas' && comidas !== null) {
    array = comidas;
  } else if (title === 'Bebidas' && bebidas !== null) {
    array = bebidas;
  }

  useEffect(() => {
    if (title === 'Comidas') {
      setType({
        item: 'meals',
        palavra: 'Meal',
      });
    } else {
      setType({
        item: 'drinks',
        palavra: 'Drink',
      });
    }
  }, [setType, title]); // []

  function redirectToDetails(id) {
    history.push(`/${title.toLowerCase()}/${id}`);
  }

  return (
    array.map((item, index) => {
      if (index <= LIMIT) {
        return (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => {
              setRecipe(item[`id${type.palavra}`]);
              redirectToDetails(item[`id${type.palavra}`]);
            } }
            onKeyPress={ () => console.log('clicou') }
            role="button"
            tabIndex={ index }
            className="cardsContainer"
          >
            <div className="imagesContainer">
              <h3 data-testid={ `${index}-card-name` }>
                { item[`str${type.palavra}`] }
              </h3>
              <img
                alt={ item[`str${type.palavra}`] }
                data-testid={ `${index}-card-img` }
                src={ item[`str${type.palavra}Thumb`] }
              />
            </div>
          </div>
        );
      }
      return null;
    })
  );
}

export default Cards;
