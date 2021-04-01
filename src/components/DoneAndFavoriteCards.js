import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fav from '../images/blackHeartIcon.svg';
import notFav from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { addFoodToFavorite, fetchFoodApiById, fetchDrinkApiById,
  removeFromFavorite } from '../helpers';
import updateFavorites from '../store/actions/favoriteRecipes.actions';

class DoneAndFavoriteCards extends Component {
  componentDidMount() {
    this.updateFavoriteRecipes();
  }

  updateFavoriteRecipes() {
    const { updateFavoriteList, updateFavoriteItems } = this.props;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes) return;
    const list = favoriteRecipes.reduce((acc, curr) => {
      acc = {
        ...acc,
        [curr.id]: true,
      };
      return acc;
    }, {});
    updateFavoriteList(list);
    if (!updateFavoriteItems) return;
    updateFavoriteItems();
  }

  async favoriteThisItem(currentRecipe) {
    const removed = removeFromFavorite(currentRecipe.id);
    if (!removed) {
      const { type } = currentRecipe;
      const fetchFoodOrDrink = {
        comida: (id) => fetchFoodApiById(id),
        bebida: (id) => fetchDrinkApiById(id),
        comidas: (id) => fetchFoodApiById(id),
        bebidas: (id) => fetchDrinkApiById(id),
      };
      const foodOrDrink = await fetchFoodOrDrink[type](currentRecipe.id);
      addFoodToFavorite(foodOrDrink, currentRecipe.type);
    }
    this.updateFavoriteRecipes();
  }

  render() {
    const { recipes, filter, share, favoriteRecipe } = this.props;

    return (
      <div>
        {recipes && recipes.filter((element) => !filter
        || filter === 'all' || element.type === filter)
          .map((obj, index) => (
            <div className="card" key={ obj.id }>
              <center>
                <div className="a">
                  <Link to={ `${obj.type}s/${obj.id}` }>
                    <img
                      data-testid={ `${index}-horizontal-image` }
                      alt="card"
                      src={ `${obj.image}` }
                      className="linkImage"
                    />
                  </Link>

                </div>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${obj.alcoholicOrNot} ${obj.area} - ${obj.category}`}

                </p>
                <Link to={ `${obj.type}s/${obj.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>{obj.name}</p>
                </Link>
                <p data-testid={ `${index}-horizontal-done-date` }>{obj.doneDate}</p>

              </center>
              <button
                type="button"
                onClick={ () => share(obj) }
              >
                <img
                  alt="card"
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                />
              </button>
              <button
                type="button"
                onClick={ () => this.favoriteThisItem(obj) }
              >
                <img
                  src={ favoriteRecipe[Number(obj.id)] ? fav : notFav }
                  alt="favorite"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />
              </button>
              {obj.tags && obj.tags.map((tag) => (
                <div
                  className="tags"
                  key={ tag }
                >
                  tags:
                  <p
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </p>
                </div>
              ))}

            </div>))}
      </div>
    );
  }
}

DoneAndFavoriteCards.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string.isRequired,
  share: PropTypes.func.isRequired,
  updateFavoriteList: PropTypes.func.isRequired,
  favoriteRecipe: PropTypes.shape({}).isRequired,
  updateFavoriteItems: PropTypes.func,
};

DoneAndFavoriteCards.defaultProps = {
  updateFavoriteItems: null,
};

const mapStateToProps = (state) => ({
  favoriteRecipe: state.favoriteRecipes,
});

const mapDispatchToProps = (dispatch) => ({
  updateFavoriteList: (favorites) => dispatch(updateFavorites(favorites)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoneAndFavoriteCards);
