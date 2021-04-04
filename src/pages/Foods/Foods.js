import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import CategoryFilter from '../../component/CategoryFilter';
import { Header, RecipeCards, Footer } from '../../component';
import Context from '../../context/Context';
import CardsContainer from '../../styles/CardsContainer';

const SHOW_TWELVE_RECIPES = 12;

export default function Foods() {
  const { recipes, setSearchParams,
    searchParams } = useContext(Context);
  const { selectedParameter } = searchParams;
  const history = useHistory();
  const [recipesToRender, setRecipesToRender] = useState([]);

  useEffect(() => setSearchParams({
    ...searchParams,
    location: history.location.pathname }),
  [setSearchParams, history.location.pathname]);

  useEffect(() => {
    if (recipes === 'NF') {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (recipes.length === 1 && selectedParameter !== 'category') {
      return history.push(`/comidas/${recipes[0].idMeal}`);
    } else if (recipes.length >= 1) {
      return setRecipesToRender([...recipes].slice(0, SHOW_TWELVE_RECIPES));
    }
  }, [recipes, history, setSearchParams, history.location.pathname, selectedParameter]);

  return (
    <>
      <Header pageTitle="Comidas" />
      <CategoryFilter />
      <CardsContainer>
        {recipesToRender.map((recipe, index) => (
          <RecipeCards
            key={ index }
            recipe={ recipe }
            id={ recipe.idMeal }
            type="Meal"
            index={ index }
          />
        ))}
      </CardsContainer>

      <Footer />
    </>
  );
}
