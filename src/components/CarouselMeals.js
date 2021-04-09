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
      numShow: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
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

  carouselGen() {
    const { meals } = this.props;
    const { initialState, numShow } = this.state;
    const maxLength = 2;
    const list = meals.slice(initialState, maxLength).map((item, index) => (
      <Link
        to={ `/comidas/${item.idMeal}` }
        key={ index }
        className="carousel-content"
        data-testid={ `${index}-recomendation-card` }
      >
        <div className="carousel-items d-flex flex-column container-fluid">
          <img
            src={ item.strMealThumb }
            alt={ item.strMeal }
            className="carousel-item-image"
          />
          <span className="recipe-category">{item.strCategory}</span>
          <span className="carousel-title txt-shdw1 font-mountains">{item.strMeal}</span>
        </div>
      </Link>
    ));
    return list[numShow];
  }

  toggleShow() {
    const { numShow } = this.state;
    if (numShow === 0) {
      this.setState({ numShow: 1 });
    } else {
      this.setState({ numShow: 0 });
    }
  }

  render() {
    return (
      <div>
        <h2 className="box-content text-left txt-shdw1">Recomendadas</h2>
        <div className="carousel-container d-flex">
          <button
            type="button"
            className="carousel-button btn btn-left"
            onClick={ this.toggleShow }
          >
            <img src={ arrowLeft } alt="arrow-left" className="arrow arrow-left" />
          </button>
          <div className="carousel">
            { this.carouselGen() }
          </div>
          <button
            type="button"
            className="carousel-button btn btn-right"
            onClick={ this.toggleShow }
          >
            <img src={ arrowRight } alt="arrow-right" className="arrow arrow-right" />
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
