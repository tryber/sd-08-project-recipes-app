/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import IngredientCardsContainer from '../../components/Cards/IngredientCardsContainer';
import getApiData, { EpIngredients } from '../../services/apiRequest';
import Loading from '../../components/animation/Loading';
import { Context } from '../../context';

const ExploreByIngredients = ({ drinksOrFoods }) => {
  const REMOVE_S = -1;
  const cardType = drinksOrFoods.slice(0, REMOVE_S);

  const [loading, setLoading] = useState(true);
  const { apiData } = useContext(Context);
  useEffect(() => {
    getApiData(cardType, EpIngredients).then((data) => {
      apiData.set(data);
      setLoading(false);
    });
  }, []);

  return (
    loading
      ? <Loading />
      : (
        <div>
          <Header
            name="Explorar Ingredientes"
            foodClass={ `explorer-${drinksOrFoods}-ingredients` }
            Show={ false }
          />
          <IngredientCardsContainer
            cardsInfos={ apiData.value }
            cardType={ cardType }
            maxCards={ 12 }
          />

          <Footer
            foodClass={ `explorer-${drinksOrFoods}-ingredients-footer` }
          />
        </div>
      )
  );
};

ExploreByIngredients.propTypes = {
  drinksOrFoods: PropTypes.string.isRequired,
};

export default ExploreByIngredients;
