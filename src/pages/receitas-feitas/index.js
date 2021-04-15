import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../../components/Header';
import shareIcon from '../../images/shareIcon.svg';

function ReceitasFeitas() {
  const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  const [doneReceipes, setDoneRecipes] = useState(doneRecipesStorage);
  const [copied, setCopied] = useState(false);

  const filterRecipes = (filter) => {
    const filtered = !filter
      ? doneRecipesStorage
      : doneRecipesStorage.filter((recipe) => filter === recipe.type);
    setDoneRecipes(filtered);
  };

  useEffect(() => {
    if (localStorage.getItem('doneRecipes') === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
  }, []);

  const copyL = (allRecipe) => {
    copy(`http://localhost:3000/${allRecipe.type}s/${allRecipe.id}`);
    setCopied(true);
  };

  return (
    <>
      <Header explore="false">Receitas Feitas</Header>
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterRecipes('') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterRecipes('comida') }
        >
          Comidas
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('bebida') }
        >
          Bebidas
        </button>
      </section>
      <section>
        {doneReceipes && doneReceipes.map((recipe, index) => (
          <section key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                style={ { width: '100vw' } }
                src={ recipe.image }
                data-testid={ `${index}-horizontal-image` }
                alt={ recipe.name }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'comida'
                ? `${recipe.area} - ${recipe.category}`
                : `${recipe.alcoholicOrNot}`}
            </p>
            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
              data-testid={ `${index}-horizontal-name` }
            >
              { recipe.name }
            </Link>
            <button
              type="button"
              onClick={ () => copyL(recipe) }
            >
              <img
                src={ shareIcon }
                data-testid={ `${index}-horizontal-share-btn` }
                alt="Share Button"
              />
              {copied && <p>Link copiado!</p>}
            </button>
            <p data-testid={ `${index}-horizontal-done-date` }>
              { recipe.doneDate }
            </p>
            {recipe.tags.map((tag) => (
              <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                { tag }
              </span>
            ))}
          </section>
        ))}
      </section>
    </>
  );
}

export default ReceitasFeitas;
