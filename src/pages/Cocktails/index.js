import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import RecipesContext from '../../context/RecipesContext';

import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import DrinkCard from '../../components/DrinkCard';
import CategoryBar from '../../components/CategoryBar';
import { LIMIT_OF_CARDS } from '../../common/defs';
import Footer from '../../components/Footer';

export default function Cocktails({ history }) {
  const { drinks, isShow } = useContext(RecipesContext);

  return (
    <div>
      <Header title="Bebidas" />
      {isShow && <SearchBar type="cocktails" />}
      <CategoryBar type="cocktails" />
      {drinks.map((drink, index) => {
        if (drinks.length === 1) {
          return <Redirect to={ `/bebidas/${drinks[0].idDrink}` } />;
        }
        if (index < LIMIT_OF_CARDS) {
          return (
            <DrinkCard
              key={ index }
              drink={ drink }
              index={ index }
              history={ history }
            />
          );
        }
        return null;
      })}
      <Footer />
    </div>
  );
}

Cocktails.propTypes = ({ history: PropTypes.objectOf(PropTypes.string).isRequired });
