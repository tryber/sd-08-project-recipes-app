import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Drinks.css';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { DrinkCtx } from '../../context/ContextDrink';
import Footer from '../../components/Footer';
import { CategoryButtons } from '../../components/Buttons';

function Drinks({ location: { state } }) {
  const STOP_INDEX = 11;
  const { drinkApi: { drinks }, setFilterDrink } = useContext(DrinkCtx);
  const [category, setCategory] = useState('');
  const [ingredient, setIngredient] = useState('');
  const history = useHistory();
  const onClickAll = ({ target }) => {
    if (state && state.fromExplorerDrinksIngredients) {
      state.fromExplorerDrinksIngredients = false;
    }
    setCategory(target.value);
    setFilterDrink({ key: 'name', value: category });
  };
  const onClickCategory = ({ target }) => {
    if (category !== target.value) {
      setCategory(target.value);
      if (state && state.fromExplorerDrinksIngredients) {
        state.fromExplorerDrinksIngredients = false;
      }
    } else { setCategory(''); }
  };

  useEffect(() => {
    if (state !== undefined && state.fromExplorerDrinksIngredients) {
      setIngredient(state.ingredient);
      setFilterDrink({ key: 'ing', value: ingredient });
    } else {
      setFilterDrink({ key: 'category', value: category });
    }
  }, [category, setFilterDrink, state, ingredient]);

  useEffect(() => {
    const categorySetting = (categoryState) => {
      if (categoryState === '' && state === undefined) {
        setFilterDrink({ key: 'name', value: categoryState });
      }
    }; categorySetting(category);
  }, [category, setFilterDrink, state]);

  const render = () => (
    <div>
      <Header name="Bebidas" icon="true" currentPage="Drinks" />
      <CategoryButtons
        label="Drinks"
        onClickAll={ onClickAll }
        onClickCategory={ onClickCategory }
      />
      <div className="cards ingredient-card">
        {drinks && drinks
          .filter((drink, index) => index <= STOP_INDEX)
          .map((item, index) => (
            <Card
              key={ item.idDrink }
              id={ item.idDrink }
              name={ item.strDrink }
              img={ item.strDrinkThumb }
              index={ index }
              onClick={ () => history.push(`/bebidas/${item.idDrink}`) }
            />
          ))}
        {console.log(state)}
        { (drinks && drinks.length === 1 && category === '')
          ? history.push(`/bebidas/${drinks[0].idDrink}`)
          : ''}
        { drinks === null
          // eslint-disable-next-line no-alert
          ? alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
          : ''}
      </div>
      <div className="spacing" />
      <Footer />
    </div>
  );

  return (render());
}

Drinks.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    state: PropTypes.shape({
      fromExplorerDrinksIngredients: PropTypes.bool,
      ingredient: PropTypes.string,
    }),
    key: PropTypes.string,
  }),
};

Drinks.defaultProps = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    state: PropTypes.string,
    key: PropTypes.string,
  }),
};

export default Drinks;
