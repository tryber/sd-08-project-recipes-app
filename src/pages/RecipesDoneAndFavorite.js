import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import ShareButton from '../components/ShareButton';
import FavButton from '../components/FavButton';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RecipesDoneAndFavorite.css';

function RecipesDoneAndFavorite({ location: { pathname } }) {
  const { done, favorite } = useSelector((state) => state.recipes);
  const [recipes, setRecipes] = useState([]);
  const [isDone, setIsDone] = useState();
  const [filter, setFilter] = useState('todos');

  useEffect(() => {
    if (pathname.endsWith('feitas')) {
      setRecipes(done);
      setIsDone(true);
    } else {
      setIsDone(false);
      setRecipes(favorite);
    }
  }, [pathname, favorite]);

  return (
    <div>
      <Header />
      <Button
        block
        className="fav-done-btn custom-btn"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('todos') }
        type="button"
      >
        All
      </Button>
      <nav className="nav-catogories">
        <Button
          className="custom-btn"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('comida') }
          type="button"
        >
          Food
        </Button>
        <Button
          className="custom-btn"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('bebida') }
          type="button"
        >
          Drinks
        </Button>
      </nav>
      {recipes.filter(({ type }) => type === filter || filter === 'todos')
        .map((recipe, index) => (
          <div key={ recipe.id }>
            <hr />
            { console.log(recipe) }
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                alt={ recipe.name }
                className="fav-done-img"
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
              />
              <h1
                className="fav-done-title"
                data-testid={ `${index}-horizontal-name` }
              >
                { recipe.name }
              </h1>
            </Link>
            <section className="fav-done-body">
              <div className="fav-done-info">
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { recipe.type.startsWith('comida')
                  && `${recipe.area} - ${recipe.category}` }
                  { recipe.type.startsWith('bebida') && recipe.alcoholicOrNot }
                </p>
                { isDone && (
                  <p data-testid={ `${index}-horizontal-done-date` }>
                    {recipe.doneDate}
                  </p>
                )}
                {isDone && (
                  recipe.tags.map((tag, tagIndex) => (
                    <p
                      key={ `${recipe.id}-tag-${tagIndex}` }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      { tag }
                    </p>
                  ))
                )}
              </div>
              <div className="icon-container">
                <ShareButton
                  id={ recipe.id }
                  index={ index }
                  type={ `${recipe.type}s` }
                />
                <FavButton
                  index={ index }
                  recipe={ recipe }
                  type={ `${recipe.type}s` }
                />
              </div>
            </section>
          </div>
        ))}
    </div>

  );
}

RecipesDoneAndFavorite.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipesDoneAndFavorite;
