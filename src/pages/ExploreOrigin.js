import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, fetchAreas } from '../actions/recipes';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import RecipeCard from '../components/RecipeCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Explore.css';

function ExploreOrigin() {
  const { list = [], isFetching, areas } = useSelector((state) => state.recipes);
  const { mealsToken } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [selectArea, setSelectArea] = useState('');

  useEffect(() => {
    dispatch(fetchAreas(mealsToken));
    dispatch(fetchRecipes(mealsToken, 'comidas'));
  }, []);

  const handleChange = ({ target }) => {
    setSelectArea(target.value);
    const reqType = { request: 'filter', key: 'a', parameter: target.value };
    dispatch(fetchRecipes(mealsToken, 'comidas', reqType));
  };
  if (isFetching || list.lenght === 0) return <Loading />;
  return (
    <>
      <Header />
      <Form className="form">
        <Form.Group controlId="select.countryForm">
          <Form.Label>Selecione o país:</Form.Label>
          <Form.Control
            as="select"
            custom
            data-testid="explore-by-area-dropdown"
            onChange={ handleChange }
            value={ selectArea }
          >
            { areas && [{ strArea: 'All' }, ...areas.meals].map(({ strArea }) => (
              <option
                data-testid={ `${strArea}-option` }
                key={ strArea }
                value={ strArea }
              >
                { strArea }
              </option>
            )) }
          </Form.Control>
        </Form.Group>
      </Form>
      <section className="cards-container">
        { list && list.map((recipe, index) => (
          <div className="card-explore" key={ `recipe-${index}` }>
            <RecipeCard
              type="comidas"
              index={ index }
              recipe={ recipe }
            />
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}

export default ExploreOrigin;
