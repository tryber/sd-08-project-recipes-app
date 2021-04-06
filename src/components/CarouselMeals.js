import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchRandomMeals } from '../actions/meals';
import arrowLeft from '../images/arrow-left.svg';
import arrowRight from '../images/arrow-right.svg';

class CarouselMeals extends React.Component {
  constructor() {
    super();

    this.state = {
      initialState: 0,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { searchRandomMeals } = this.props;
    searchRandomMeals();
  }

  handleClick(number) {
    this.setState((prevState) => ({
      initialState: prevState.initialState + number,
    }));
  }

  render() {
    const { meals } = this.props;
    const { initialState } = this.state;
    const maxLength = 2;
    return (
      <div>
        <h2 className="box-content">Recomendadas</h2>
        <div className="carousel">
          {
            meals.slice(initialState, maxLength).map((item, index) => (
              <Link
                to={ `/comidas/${item.idMeal}` }
                key={ index }
                className="carousel-content"
                data-testid={ `${index}-recomendation-card` }
              >
                <img
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                  className="carousel-item-image"
                />
                <div className="carousel-items">
                  <span className="recipe-category">{item.strCategory}</span>
                  <span className="carousel-title">{item.strMeal}</span>
                </div>
              </Link>
            ))
          }
        </div>
        <div className="buttons">
          <button
            type="button"
            className="carousel-button"
          >
            <img src={ arrowLeft } alt="arrow-left" />
          </button>
          <button
            type="button"
            className="carousel-button"
          >
            <img src={ arrowRight } alt="arrow-right" />
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ meals }) => ({
  meals: meals.meals,
});

const mapDispatchToProps = (dispatch) => ({
  searchRandomMeals: () => dispatch(fetchRandomMeals()),
});

CarouselMeals.propTypes = {
  searchRandomMeals: PropTypes.func.isRequired,
  meals: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CarouselMeals);
