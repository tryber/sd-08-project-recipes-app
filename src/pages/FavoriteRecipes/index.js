import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import FilterButton from '../../components/Buttons/FilterButton';
import '../../components/cards/doneCards.css';
import FavoriteRecipesCard from '../../components/cards/favoriteCards';
import { saveFavorites } from '../../redux/actions/details';

function FavoriteRecipes({ history }) {
  const [filterBy, setFilterBy] = useState('');
  const [recipesState, setRecipesState] = useState();
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.detailsReducer);

  useEffect(() => {
    const favoritesFromLocalStorage = JSON
      .parse(localStorage.getItem('favoriteRecipes')) || [];
    dispatch(saveFavorites(favoritesFromLocalStorage));
    const recipes = favorites.filter((favorite) => favorite.type.includes(filterBy));
    setRecipesState(recipes);
  }, []);

  useEffect(() => {
    const recipes = favorites.filter((favorite) => favorite.type.includes(filterBy));
    setRecipesState(recipes);
  }, [favorites, filterBy]);

  return (
    <>
      <Header history={ history } />
      <section className="filters">
        <FilterButton filter="all" setFilterBy={ setFilterBy } />
        <FilterButton filter="food" setFilterBy={ setFilterBy } />
        <FilterButton filter="drink" setFilterBy={ setFilterBy } />
      </section>
      <h1>Receitas Favoritas</h1>
      { (recipesState)
        ? (recipesState
          .map((recipe, index) => (<FavoriteRecipesCard
            key={ recipe.id }
            index={ index }
            favorite={ recipe }
          />)))
        : (<h2>Não há receitas favoritadas</h2>)}
    </>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.string.isRequired,
};

export default FavoriteRecipes;
