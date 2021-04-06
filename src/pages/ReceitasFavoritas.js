import React, { useContext, useEffect, useState } from 'react';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import Loading from '../components/Loading';
import Context from '../context/Context';

function ReceitasFavoritas() {
  const [filterType, setFilterType] = useState('');
  const { favoriteRecipesList, setFavoriteRecipesList } = useContext(Context);

  useEffect(() => {
    async function filterRecipes(filterParam) {
      const favoriteRecipes = await JSON.parse(localStorage.getItem('favoriteRecipes'));
      const filteredRecipes = favoriteRecipes
        .filter((element) => element.type === filterParam);
      setFavoriteRecipesList(filteredRecipes);
    }

    async function getFavoriteRecipes() {
      const favoriteRecipes = await JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (filterType === 'food') return filterRecipes('comida');
      if (filterType === 'drinks') return filterRecipes('bebida');
      setFavoriteRecipesList(favoriteRecipes);
    }
    getFavoriteRecipes();
  }, [setFavoriteRecipesList, filterType]);

  function handleFilter(filterParam) {
    setFilterType(filterParam);
  }

  return (
    <>
      <HeaderWithoutSearch />
      <main className="favorites-container">
        <div className="filters-container">
          <button
            data-testid="filter-by-all-btn"
            type="button"
            value="all"
            onClick={ () => handleFilter('') }
          >
            All
          </button>
          <button
            data-testid="filter-by-food-btn"
            type="button"
            value="food"
            onClick={ () => handleFilter('food') }
          >
            Food
          </button>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            value="drinks"
            onClick={ () => handleFilter('drinks') }
          >
            Drinks
          </button>
        </div>
        {
          favoriteRecipesList !== null || undefined
            ? favoriteRecipesList.map(
              (recipe, index) => (
                <FavoriteRecipeCard key={ recipe.id } recipe={ recipe } index={ index } />
              ),
            )
            : <Loading />
        }
      </main>
    </>
  );
}

export default ReceitasFavoritas;
