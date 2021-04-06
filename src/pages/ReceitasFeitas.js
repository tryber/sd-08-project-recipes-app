import React, { useContext, useEffect, useState } from 'react';
import DoneRecipeCard from '../components/DoneRecipeCard';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import Loading from '../components/Loading';
import Context from '../context/Context';

function ReceitasFeitas() {
  const [filterType, setFilterType] = useState('');
  const { doneRecipesList, setDoneRecipesList } = useContext(Context);

  useEffect(() => {
    async function filterRecipes(filterParam) {
      const doneRecipes = await JSON.parse(localStorage.getItem('doneRecipes'));
      const filteredRecipes = doneRecipes
        .filter((element) => element.type === filterParam);
      setDoneRecipesList(filteredRecipes);
    }

    async function getDoneRecipes() {
      const doneRecipes = await JSON.parse(localStorage.getItem('doneRecipes'));
      if (filterType === 'food') return filterRecipes('comida');
      if (filterType === 'drinks') return filterRecipes('bebida');
      setDoneRecipesList(doneRecipes);
    }
    getDoneRecipes();
  }, [setDoneRecipesList, filterType]);

  function handleFilter(filterParam) {
    setFilterType(filterParam);
  }

  return (
    <>
      <HeaderWithoutSearch />
      <main>
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
        {
          doneRecipesList !== null || undefined
            ? doneRecipesList.map(
              (recipe, index) => (
                <DoneRecipeCard key={ recipe.id } recipe={ recipe } index={ index } />
              ),
            )
            : <Loading />
        }
      </main>
    </>
  );
}

export default ReceitasFeitas;
