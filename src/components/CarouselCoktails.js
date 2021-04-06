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
    };

    this.handleClick = this.handleClick.bind(this);
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

  render() {
    const { cocktails } = this.props;
    const { initialState } = this.state;
    const maxLength = 2;
    return (
      <div>
        <h2 className="box-content">Recomendadas</h2>
        <div className="carousel">
          {
            cocktails.slice(initialState, maxLength).map((item, index) => (
              <Link
                to={ `/bebidas/${item.idDrink}` }
                key={ index }
                className="carousel-content"
                data-testid={ `${index}-recomendation-card` }
              >
                <img
                  src={ item.strDrinkThumb }
                  alt={ item.strDrink }
                  className="carousel-item-image"
                />
                <div className="carousel-items">
                  <span className="recipe-category">{item.strAlcoholic}</span>
                  <span className="carousel-title">{item.strDrink}</span>
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
