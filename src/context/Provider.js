import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './MyContext';
import categoryRequest from '../services/categoryRequest';
import firstRequest from '../services/firstRequest';

function Provider({ children }) {
  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toggleExplore, setToggleExplore] = useState(false);
  const [toggleCategoryFilter, setToggleCategoryFilter] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [createCards, setCreateCards] = useState(false);
  const [apiResponse, setApiResponse] = useState([]);
  const [type, setType] = useState({ item: 'item', palavra: 'palavra' });
  const [comidas, setComidas] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [categoryComidas, setCategoryComidas] = useState([]);
  const [categoryBebidas, setCategoryBebidas] = useState([]);
  const [recipe, setRecipe] = useState({});
  const [recomendados, setRecomendados] = useState([]);
  const [renderRec, setRenderRec] = useState(false);
  const [renderButtonComparison, setRenderButtonComparison] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [checkedStatus, setCheckedStatus] = useState(false);
  const [countCheck, setCountCheck] = useState(0);
  const [verifyChecked, setVerifyChecked] = useState(true);
  const [done, setDone] = useState(JSON.parse(localStorage.getItem('doneRecipes')) || []);
  const [cardId, setCardId] = useState('');
  const [recipeFavorite, setRecipeFavorite] = useState(JSON.parse(localStorage
    .getItem('favoriteRecipes')) || []);
  const [resposta, setResposta] = useState([]);

  const contextValue = {
    userEmail,
    setEmail,
    password,
    setPassword,
    toggleExplore,
    setToggleExplore,
    searchFilter,
    setSearchFilter,
    inputSearch,
    setInputSearch,
    createCards,
    setCreateCards,
    apiResponse,
    setApiResponse,
    type,
    setType,
    comidas,
    setComidas,
    bebidas,
    setBebidas,
    categoryComidas,
    setCategoryComidas,
    categoryBebidas,
    setCategoryBebidas,
    toggleCategoryFilter,
    setToggleCategoryFilter,
    recipe,
    setRecipe,
    recomendados,
    setRecomendados,
    renderRec,
    setRenderRec,
    renderButtonComparison,
    setRenderButtonComparison,
    copied,
    setCopied,
    favorite,
    setFavorite,
    checkedStatus,
    setCheckedStatus,
    countCheck,
    setCountCheck,
    verifyChecked,
    setVerifyChecked,
    done,
    setDone,
    cardId,
    setCardId,
    recipeFavorite,
    setRecipeFavorite,
    resposta,
    setResposta,
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const { comidasApi, bebidasApi } = await firstRequest();
    setComidas(comidasApi.meals);
    setBebidas(bebidasApi.drinks);
    setCreateCards(true);
    const { categoryComidasApi, categoryBebidasApi } = await categoryRequest();
    setCategoryComidas(categoryComidasApi.meals);
    setCategoryBebidas(categoryBebidasApi.drinks);
  }, []);

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>);
}

Provider.propTypes = {
  children: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
};

export default Provider;
