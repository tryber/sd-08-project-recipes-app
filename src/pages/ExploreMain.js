import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchRecipes } from '../actions/recipes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Explore.css';

function ExploreMain({ location: { pathname } }) {
  const type = pathname.split('/')[2];
  const { mealsToken, cocktailsToken } = useSelector((state) => state.login);
  const { list } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const prevList = useRef(list);

  const handleClick = () => {
    const token = type === 'comidas' ? mealsToken : cocktailsToken;
    dispatch(fetchRecipes(token, type, { request: 'random', key: '' }));
  };

  useEffect(() => {
    if (list !== prevList.current) {
      setId(list[0].id);
    }
    return () => setId('');
  }, [list]);

  return (
    <>
      <Header />
      <section className="explore-button">
        <Link
          data-testid="explore-by-ingredient"
          to={ `${pathname}/ingredientes` }
        >
          <Button
            block
            className="custom-btn-explore"
            variant="primary"
          >
            Por Ingredientes
          </Button>
        </Link>
        { (type === 'comidas') && (
          <Link
            data-testid="explore-by-area"
            to={ `${pathname}/area` }
          >
            <Button
              block
              className="custom-btn-explore"
              variant="primary"
            >
              Por Local de Origem
            </Button>
          </Link>) }
        <div className="surprise-me">
          <Button
            block
            className="custom-btn-explore"
            data-testid="explore-surprise"
            onClick={ handleClick }
            type="button"
            variant="primary"
          >
            Me Surpreenda!
          </Button>
        </div>
        { id && <Redirect to={ `../${type}/${id}` } /> }
      </section>
      <Footer />
    </>
  );
}
ExploreMain.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExploreMain;
