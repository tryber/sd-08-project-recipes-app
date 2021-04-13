import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Alert } from 'react-bootstrap';
import RecipeCard from '../components/RecipeCard';
import Loading from '../components/Loading';
import CategoryButton from '../components/CategoryButton';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { byAddIngredient, fetchCategories, fetchRecipes } from '../actions/recipes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css';

function Main({ location: { pathname } }) {
  const {
    list, isFetching, categories, byIngredient, filter,
  } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const history = useHistory();
  const type = pathname.slice(1);
  const { mealsToken, cocktailsToken } = useSelector((state) => state.login);

  const renderRecipes = () => {
    if (list.length === 0) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return (
        <Alert style={ { marginTop: '20px' } } variant="danger">
          {
            (Date.now() % 2 === 0)
              ? <Alert.Heading>Uai...</Alert.Heading>
              : <Alert.Heading>Oxi...</Alert.Heading>
          }
          <p>Redefina o campo de busca.</p>
        </Alert>
      );
    }
    if (list.length === 1 && filter === '') {
      history.push(`${pathname}/${list[0].id}`);
      return;
    }
    return (
      <section className="cards-container">
        {list.map((recipe, index) => (
          <div className="cards-main" key={ `recipe-${index}` }>
            <RecipeCard
              type={ type }
              index={ index }
              recipe={ recipe }
            />
          </div>
        ))}
      </section>
    );
  };

  useEffect(() => {
    const reqType = { request: 'filter', key: 'i', parameter: byIngredient };
    const token = pathname === 'comidas' ? mealsToken : cocktailsToken;
    dispatch(fetchCategories(token, type));
    if (byIngredient) {
      dispatch(fetchRecipes(token, type, reqType));
      dispatch(byAddIngredient(''));
    } else {
      dispatch(fetchRecipes(token, type));
    }
  }, [pathname]);

  return (
    <>
      <Header />
      <nav className="nav-catogories">
        { categories
          .map((category) => (
            <CategoryButton
              name={ category }
              key={ `btn-${category}` }
              type={ type }
            />))}
        <CategoryButton name="All" type={ type } />
      </nav>
      { isFetching ? <Loading /> : renderRecipes() }
      <Footer />
    </>
  );
}

Main.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Main;
