import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { clearRecipesAction } from '../redux/actions/clearRecipesAction';
import fetchMealThunk from '../redux/actions/fetchMealAction';

function ExploreOrigin() {
  const history = useHistory();
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.recipes.recipes);
  const area = useSelector((state) => state.search.areaChoosen);
  const type = area !== '' ? 'area' : '';
  useEffect(() => {
    const fetchData = (inputf, typef) => dispatch(fetchMealThunk(inputf, typef));
    fetchData(area, type);
  }, [area, type]);

  useEffect(() => () => {
    dispatch(clearRecipesAction());
  }, []);

  return (
    <main>
      <Header />
      <section className="cards">
        { meals && meals.map((elem, index) => (
          <button
            key={ elem.idMeal }
            type="button"
            onClick={ () => history.push(`/comidas/${elem.idMeal}`) }
            data-testid={ `${index}-recipe-card` }
          >
            <div>
              <h4 data-testid={ `${index}-card-name` }>{ elem.strMeal }</h4>
              <span>{ elem.idMeal }</span>
              <img
                className="card"
                src={ elem.strMealThumb }
                alt={ elem.strMeal }
                data-testid={ `${index}-card-img` }
              />
            </div>
          </button>
        ))}
      </section>
      <Footer />
    </main>
  );
}

export default ExploreOrigin;
