import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../../context/RecipeContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExplorarBebidasIngredientes({ history }) {
  const {
    setMeals, setIsDrinkLoading, setCameFromIngredients } = useContext(RecipeContext);
  const [ingredientes, setIngredientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const TWELVE_INGREDIENTS = 12;

  const fetchIngredients = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const result = await response.json();
    const finalResults = result.drinks.filter((elem, index) => {
      if (index < TWELVE_INGREDIENTS) {
        return elem;
      }
      return '';
    });
    setIngredientes(finalResults);
    setLoading(false);
  };

  const fetchAndRedirect = async ({ target }) => {
    setIsDrinkLoading(true);
    setCameFromIngredients(true);
    const ingredientName = target.parentNode.firstChild.innerText;
    console.log(ingredientName);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`)
      .then((response) => response.json())
      .then((data) => setMeals(data.drinks))
      .then(() => history.push('/bebidas'))
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
          key={ `${elem.idIngredient1}, ${index} ` }
        >
          <div
            key={ `${elem.idIngredient1}, ${index} ` }
            data-testid={ `${index}-ingredient-card` }
          >
            <h1 data-testid={ `${index}-card-name` }>
              {elem.strIngredient1}
            </h1>
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${elem.strIngredient1}-Small.png` }
              alt={ elem.strIngredient1 }
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

ExplorarBebidasIngredientes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExplorarBebidasIngredientes;
