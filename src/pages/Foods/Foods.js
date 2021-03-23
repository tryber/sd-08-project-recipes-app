import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Header, RecipeCards, Footer } from '../../component';
import Context from '../../context/Context';

const SHOW_TWELVE_RECIPES = 12;

export default function Foods() {
  const { recipes } = useContext(Context);
  const history = useHistory();
  const [recipesToRender, setRecipesToRender] = useState([]);

  useEffect(() => {
    if (recipes === 'NF') {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (recipes.length === 1) {
      return history.push(`/comidas/${recipes[0].idMeal}`);
    }
    if (recipes.length > 1) {
      return setRecipesToRender([...recipes].slice(0, SHOW_TWELVE_RECIPES));
    }
  }, [recipes, history]);

  return (
    <>
      <Header pageTitle="Comidas" />

      <div>
        {recipesToRender.map((recipe, index) => (
          <RecipeCards key={ index } recipe={ recipe } type="Meal" index={ index } />
        ))}
      </div>

      <Footer />
    </>
  );
}
