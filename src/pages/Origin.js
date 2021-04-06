/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Searchbar from '../components/Searchbar';
import getApiData from '../services/apiRequest';
import CategoryDropDownSelector from '../components/DropDown';
import Loading from '../components/animation/Loading';
import RecipeCardsContainer from '../components/Cards/RecipeCardsContainer';

const Origin = () => {
  const { apiData, hideSearchBar, filteredName } = useContext(Context);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    hideSearchBar.set(true);
    getApiData('food', 'search.php?s=').then((data) => {
      apiData.set(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Header
        name="Explorar Origem"
        foodClass="explorer-foods-origin "
        Show
      />

      { !hideSearchBar.value && <Searchbar type="food" />}
      {!loading && <CategoryDropDownSelector recipeType="food" />}
      { loading ? <Loading /> : (<RecipeCardsContainer
        cardsInfos={
          filteredName.value.length > 0
            ? filteredName.value
            : apiData.value
        }
        cardType="food"
        maxCards={ 12 }
      />
      )}
      {/* <Searchbar /> */}
      <Footer
        foodClass="explorer-foods-origin-footer"
      />
    </div>
  );
};

export default Origin;
