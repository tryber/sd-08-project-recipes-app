import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import { fetchRecipes, fetchRecommendations } from '../actions/recipes';
import Loading from '../components/Loading';
import RecipeCard from '../components/RecipeCard';
import IngredientsList from '../components/IngredientsList';
import ProgressButton from '../components/ProgressButton';
import FavButton from '../components/FavButton';
import ShareButton from '../components/ShareButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RecipeDetails.css';
import 'react-multi-carousel/lib/styles.css';

function RecipeDetails({ match: { params }, location: { pathname } }) {
  const { list, isFetching, recommendations } = useSelector((state) => state.recipes);
  const { mealsToken, cocktailsToken } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [shouldFetch, setShouldFetch] = useState(true);
  const inProgress = pathname.split('/')[3] === 'in-progress';
  const type = useRef(pathname.split('/')[1]);
  const recommendationsType = useRef(type.current === 'comidas' ? 'bebidas' : 'comidas');

  useEffect(() => {
    const token = pathname === '/comidas' ? mealsToken : cocktailsToken;
    setShouldFetch(true);
    [type.current] = pathname.split('/').slice(1);
    recommendationsType.current = type.current === 'comidas' ? 'bebidas' : 'comidas';
    dispatch(fetchRecipes(token, type.current,
      { request: 'lookup', key: 'i', parameter: params.id }));
    dispatch(fetchRecommendations(token, recommendationsType.current));
    setShouldFetch(false);
  }, [params, pathname]);

  const recipe = list[0];
  const IngredientKeys = Object.keys(recipe || {})
    .filter((ingKey) => (
      ingKey
        .startsWith('strIngredient')
        && recipe[ingKey] !== '' && recipe[ingKey] !== null));
  const IngredientsAndMeasures = IngredientKeys
    .map((key, index) => [recipe[key], recipe[`strMeasure${index + 1}`]]);

  const responsive = {
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    isFetching || shouldFetch || !recipe ? <Loading /> : (
      <section>
        <img
          className="recipe-photo"
          data-testid="recipe-photo"
          src={ recipe.image }
          alt={ recipe.name }
        />
        <header className="header-details">
          <h1 data-testid="recipe-title">{ recipe.name }</h1>
          <div>
            <ShareButton type={ type.current } id={ params.id } />
            <FavButton recipe={ recipe } />
          </div>
        </header>
        <h2 className="header-title " data-testid="recipe-category">
          { `${recipe.alcoholicOrNot} ${recipe.category}` }
        </h2>
        <section className="section-recipe">
          <IngredientsList
            id={ params.id }
            type={ type.current }
            ingredients={ IngredientsAndMeasures }
          />
        </section>
        <section className="section-recipe">
          <p data-testid="instructions">{ recipe.strInstructions }</p>
        </section>
        { recipe.strYoutube
        && <iframe
          src={ recipe.strYoutube.split('watch?v=').join('embed/') }
          title="Video"
          data-testid="video"
        /> }
        { !inProgress && (
          <Carousel className="carousel" responsive={ responsive }>
            { recommendations.map((recommendation, index) => (
              <div
                className="cards-recommendations"
                data-testid={ `${index}-recomendation-card` }
                key={ `rec-${index}` }
              >
                <RecipeCard
                  index={ index }
                  recipe={ recommendation }
                  recommendation
                  type={ recommendationsType.current }
                />
              </div>
            )) }
          </Carousel>
        )}
        <ProgressButton
          id={ params.id }
          type={ type.current }
          ingredientsLength={ IngredientsAndMeasures.length }
        />
      </section>
    ));
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeDetails;
