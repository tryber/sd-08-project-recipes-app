import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchRandomCocktails } from '../actions/cocktails';
import arrowLeft from '../images/arrow-left.svg';
import arrowRight from '../images/arrow-right.svg';

class CarouselCocktails extends React.Component {
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
    const { searchRandomCocktails } = this.props;
    searchRandomCocktails();
  }

  handleClick(number) {
    this.setState((prevState) => ({
      initialState: prevState.initialState + number,
    }));
  }

  carouselGen() {
    const { cocktails } = this.props;
    const { initialState, numShow } = this.state;
    const maxLength = 2;
    const list = cocktails.slice(initialState, maxLength).map((item, index) => (
      <Link
        to={ `/bebidas/${item.idDrink}` }
        key={ index }
        className="carousel-content"
        data-testid={ `${index}-recomendation-card` }
      >
        <div className="carousel-items d-flex flex-column container-fluid">
          <img
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
            className="carousel-item-image"
          />
          <span className="recipe-category">{item.strAlcoholic}</span>
          <span className="carousel-title txt-shdw1 font-mountains">{item.strDrink}</span>
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

const mapStateToProps = ({ cocktails }) => ({
  cocktails: cocktails.cocktails,
});

const mapDispatchToProps = (dispatch) => ({
  searchRandomCocktails: () => dispatch(fetchRandomCocktails()),
});

CarouselCocktails.propTypes = {
  searchRandomCocktails: PropTypes.func.isRequired,
  cocktails: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CarouselCocktails);
