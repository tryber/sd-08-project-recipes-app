import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import RecipeContext from '../../context/RecipeContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExplorarComidasIngredientes({ history }) {
  const {
    setCameFromIngredients, setMeals, setIsDrinkLoading } = useContext(RecipeContext);

  const [ingredientes, setIngredientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const TWELVE_INGREDIENTS = 12;

  const fetchIngredients = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const result = await response.json();
    const finalResults = result.meals.filter((elem, index) => {
      if (index < TWELVE_INGREDIENTS) {
        return elem;
      }
      return '';
    });
    setIngredientes(finalResults);
    setLoading(false);
  };

  const fetchAndRedirect = async ({ target }) => {
    setCameFromIngredients(true);
    await setIsDrinkLoading(true);
    const ingredientName = target.parentNode.firstChild.innerText;
    console.log(ingredientName);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`)
      .then((response) => response.json())
      .then((data) => setMeals(data.meals))
      .then(() => history.push('/comidas'))
      .then(() => {
        setIsDrinkLoading(false);
        setCameFromIngredients(true);
      });
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" search={ false } />
      {!loading && ingredientes.map((elem, index) => (
        <label
          htmlFor={ `${index}-checkbox` }
          key={ `${elem.idIngredient}, ${index} ` }
        >
          <div
            key={ `${elem.idIngredient}, ${index} ` }
            data-testid={ `${index}-ingredient-card` }
          >
            <h3 data-testid={ `${index}-card-name` }>
              {elem.strIngredient}
            </h3>
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${elem.strIngredient}-Small.png` }
              alt={ elem.strIngredient }
            />
          </div>
          <input
            type="checkbox"
            id={ `${index}-checkbox` }
            onChange={ fetchAndRedirect }
          />
        </label>
      ))}
      <Footer />
    </div>
  );
}

ExplorarComidasIngredientes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExplorarComidasIngredientes;
