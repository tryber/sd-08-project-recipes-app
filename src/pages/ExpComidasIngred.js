import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import Footer from '../components/Footer';
import { requestMealsIngredientsList } from '../services/apiRequests';
import Loading from '../components/Loading';

function ExplorarComidasIngredientes() {
  const history = useHistory();
  const MIN_INDEX = 0;
  const MAX_INDEX = 12;
  const [ingredientsMealsList, setIngredientsMealsList] = useState([]);
  const { setInputValue, setSearchParams } = useContext(Context);

  useEffect(() => {
    const requestByIngredients = async () => {
      const ingredients = await requestMealsIngredientsList();
      setIngredientsMealsList(ingredients);
    };
    requestByIngredients();
  }, []);

  return (
    <>
      <HeaderWithoutSearch />
      {
        !ingredientsMealsList
          ? <Loading />
          : (
            <main className="explore-ingredients-card">
              {
                ingredientsMealsList.slice(MIN_INDEX, MAX_INDEX)
                  .map(({ strIngredient }, index) => (
                    <button
                      type="button"
                      key={ strIngredient }
                      data-testid={ `${index}-ingredient-card` }
                      onClick={ () => {
                        setInputValue(strIngredient);
                        setSearchParams('ingrediente');
                        history.push('/comidas');
                      } }
                    >
                      <img
                        src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                        alt={ strIngredient }
                        data-testid={ `${index}-card-img` }
                      />
                      <span
                        data-testid={ `${index}-card-name` }
                      >
                        { strIngredient }
                      </span>
                    </button>
                  ))
              }
            </main>
          )
      }
      <Footer />
    </>
  );
}

export default ExplorarComidasIngredientes;
