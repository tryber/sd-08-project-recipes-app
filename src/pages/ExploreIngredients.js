import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { byAddIngredient, fetchRecipes } from '../actions/recipes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Explore.css';

function ExploreIngredients({ location: { pathname } }) {
  const type = pathname.split('/')[2];
  const { mealsToken, cocktailsToken } = useSelector((state) => state.login);
  const { list = [], isFetching } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const reqType = { request: 'list', key: 'i', parameter: 'list' };
    const token = type === 'comidas' ? mealsToken : cocktailsToken;
    dispatch(fetchRecipes(token, type, reqType));
  }, []);

  const handleClick = (ingredient) => {
    setShouldRedirect(true);
    dispatch(byAddIngredient(ingredient));
  };

  if (isFetching) return (<Loading />);
  return (
    <>
      <Header />
      <section className="cards-container">
        { type === 'comidas'
          ? list.map(({ idIngredient, strIngredient }, index) => {
            const url = `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`;
            return (
              <Card
                border="dark"
                className="card-explore"
                key={ idIngredient }
              >
                <button
                  data-testid={ `${index}-ingredient-card` }
                  onClick={ () => handleClick(strIngredient) }
                  type="button"
                >
                  <Card.Img
                    alt={ `ingredient ${idIngredient}` }
                    className="ingredients-img"
                    data-testid={ `${index}-card-img` }
                    src={ url }
                    variant="top"
                  />
                  <Card.Body>
                    <Card.Title
                      data-testid={ `${index}-card-name` }
                    >
                      { strIngredient }
                    </Card.Title>
                  </Card.Body>
                </button>
              </Card>
            );
          })
          : list.map(({ strIngredient1 }, index) => {
            const url = `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`;
            return (
              <Card
                border="dark"
                className="card-explore"
                key={ strIngredient1 }
              >
                <button
                  data-testid={ `${index}-ingredient-card` }
                  onClick={ () => handleClick(strIngredient1) }
                  type="button"
                >
                  <Card.Img
                    alt={ `ingredient ${strIngredient1}` }
                    className="ingredients-img"
                    data-testid={ `${index}-card-img` }
                    src={ url }
                    variant="top"
                  />
                  <Card.Body>
                    <Card.Title
                      data-testid={ `${index}-card-name` }
                    >
                      { strIngredient1 }
                    </Card.Title>
                  </Card.Body>
                </button>
              </Card>
            );
          }) }
      </section>
      { shouldRedirect && <Redirect to={ `/${type}` } /> }
      <Footer />
    </>
  );
}

ExploreIngredients.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExploreIngredients;
