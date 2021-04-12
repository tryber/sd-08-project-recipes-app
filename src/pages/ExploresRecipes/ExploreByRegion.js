import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRegionRecipe, getExploreMealsByRegion } from '../../store/actions';
import { Header, Footer, Loading } from '../../components';

import '../../styles/pages/Container.css';

const MAX_SIX_CARDS = 12;

class ExploreByRegion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regionSelector: 'All',
    };
  }

  componentDidMount() {
    const {
      regionsFetcher,
      recipesByRegion,
    } = this.props;
    const { regionSelector } = this.state;
    regionsFetcher();
    recipesByRegion(regionSelector);
  }

  componentDidUpdate(_, nextState) {
    const { recipesByRegion } = this.props;
    const { regionSelector } = this.state;
    if (nextState.regionSelector !== regionSelector) {
      return recipesByRegion(regionSelector);
    }
  }

  render() {
    const {
      isFetching,
      regions,
      recipes,
    } = this.props;
    const { regionSelector } = this.state;
    return (
      <div>
        <Header title="Explorar Origem" />
        <Loading state={ isFetching }>
          <div className="container">
            <select
              value={ regionSelector }
              data-testid="explore-by-area-dropdown"
              onChange={ ({ target }) => this.setState({ regionSelector: target.value }) }
            >
              <option key="All" data-testid="All-option">
                All
              </option>
              {regions.map((area) => (
                <option key={ area.strArea } data-testid={ `${area.strArea}-option` }>
                  {area.strArea}
                </option>
              ))}
            </select>
            {recipes.slice(0, MAX_SIX_CARDS).map((recipe, index) => (
              <Link key={ recipe.idMeal } to={ `/comidas/${recipe.idMeal}` }>
                <div data-testid={ `${index}-recipe-card` }>
                  <img
                    src={ recipe.strMealThumb }
                    alt="foto receita"
                    data-testid={ `${index}-card-img` }
                  />
                  <span data-testid={ `${index}-card-name` }>
                    {recipe.strMeal}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Loading>
        <Footer />
      </div>
    );
  }
}

ExploreByRegion.propTypes = {
  regions: PropTypes.arrayOf({
    strArea: PropTypes.string,
  }).isRequired,
  regionsFetcher: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  recipes: PropTypes.arrayOf({
    idMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  recipesByRegion: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  exploreRecipesByRegion: { isFetching, regions, recipes },
}) => ({
  isFetching,
  regions,
  recipes,
});

const mapDispatchToProps = (dispatch) => ({
  regionsFetcher: () => dispatch(getRegionRecipe()),
  recipesByRegion: (region) => dispatch(getExploreMealsByRegion(region)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreByRegion);
