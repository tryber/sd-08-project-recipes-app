import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Header, Footer, Cards } from '../components';
import { fetchDrink } from '../store/actions';
import '../styles/pages/Container.css';

const MAX_NUMBER_CARDS = 11;
class Drinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      searchRadio: 'name',

    };
  }

  componentDidMount() {
    const { getDrink } = this.props;
    const { search, searchRadio } = this.state;
    getDrink({ search, searchRadio });
  }

  render() {
    const { listDrinks } = this.props;
    if (listDrinks && listDrinks.length === 1) {
      return <Redirect to={ `/bebidas/${listDrinks[0].idDrink}` } />;
    }
    return (
      <div>
        <Header title="Bebidas" />
        <div className="container">

          {listDrinks && listDrinks.reduce((acc, cur, index) => {
            if (index <= MAX_NUMBER_CARDS) {
              acc.push(cur);
            }
            return acc;
          }, []).map((drink, index) => (
            <Cards
              data-testid={ `${index}-recipe-card` }
              key={ index }
              strThumb={ drink.strDrinkThumb }
              str={ drink.strDrink }
              index={ index }
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

Drinks.propTypes = {
  listDrinks: PropTypes.arrayOf(PropTypes.objectOf)
    .isRequired,
  getDrink: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
  listDrinks: state.drinksReducer.data.drinks,
  isFetching: state.cloneFoodsReducer.isFetching,

});

const mapDispatchToProps = (dispatch) => ({
  getDrink: (value) => dispatch(fetchDrink(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
