import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Header, Footer, Loading, Cards } from '../components';
import { fetchFood } from '../store/actions';
import '../styles/pages/Container.css';

const MAX_NUMBER_CARDS = 11;

class Foods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      searchRadio: 'name',
    };
  }

  componentDidMount() {
    const { search, searchRadio } = this.state;
    const { getFood } = this.props;
    getFood({ search, searchRadio });
  }

  render() {
    const { listFoods, isFetching } = this.props;
    if (listFoods && listFoods.length === 1) {
      return <Redirect to={ `/comidas/${listFoods[0].idMeal}` } />;
    }

    return (
      <div>
        <Header title="Comidas" />
        {isFetching && <Loading />}
        <div className="container">

          { listFoods && listFoods.reduce((acc, cur, index) => {
            if (index <= MAX_NUMBER_CARDS) {
              acc.push(cur);
            }
            return acc;
          }, [])
            .map((food, index) => (
              <Cards
                key={ index }
                strThumb={ food.strMealThumb }
                str={ food.strMeal }
                index={ index }
              />
            ))}
        </div>
        <Footer />
      </div>
    );
  }
}

Foods.propTypes = {
  listFoods: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  getFood: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  listFoods: state.cloneFoodsReducer.recipes.meals,
  isFetching: state.cloneFoodsReducer.isFetching,

});

const mapDispatchToProps = (dispatch) => ({
  getFood: (value) => dispatch(fetchFood(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
